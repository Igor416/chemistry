import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Element } from '../../JSONTypes';
import Cell from "./Cell";
import useTable from "./useTable";

interface PeriodicTableProps {
  shown: boolean;
  hideTable: (value: boolean) => void;
  pickElement: (el: Element) => void;
}

export default function PeriodicTable({shown, hideTable, pickElement}: PeriodicTableProps) {
  const { elements, lanthanides, actinides } = useTable()

  return (
    <div
      id='periodic_table'
      style={{
        gridTemplateColumns: 'auto '.repeat(19),
        zIndex: 1100
      }}
      className={`transition-l ${shown ? 'shown' : 'hidden-end'} position-absolute d-grid w-100 h-100 p-3 h5`}
    >
      <Cell />
      {Array.from(Array(18)).map((_, i) => <Cell key={i} element={i + 1} />)}
      {elements.map((el, i) => {
        if (el?.symbol === 'Lu' || el?.symbol === 'Lr') {
          return <Cell key={i} element={el.symbol === 'Lu' ? '*' : '**'} />
        } else if (el === undefined) {
          const [prev, next] = [Number(elements[i - 1]?.group) + 2, Number(elements[i + 1]?.group) + 1]
          return <div key={i} style={{gridColumn: prev + ' / ' + next}}></div>
        } else if (el === null) {
          return <Cell key={i} element={elements[i + 1]?.period} />
        }
        return <Cell key={i} element={el} pickElement={pickElement} />
      })}
      <Cell />
      <Cell element='Lanthanides *' isLabel={true} />
      {lanthanides.map((el, i) => <Cell key={i} element={el} pickElement={pickElement} />)}
      <Cell element='Actinides **' isLabel={true} />
      {actinides.map((el, i) => <Cell key={i} element={el} pickElement={pickElement} />)}
      <div onClick={() => hideTable(false)} className='position-absolute h2 end-0 my-3 mx-4'>
        <FontAwesomeIcon className='transition-l' icon={faTimes} />
      </div>
    </div>
  )
}