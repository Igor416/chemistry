import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getElements } from '../api';
import { Element } from '../JSONTypes';

import Cell from './reusables/Cell';

interface PeriodicTableProps {
  shown: boolean;
  hideTable: (value: boolean) => void;
  pickElement: (el: Element) => void;
}

export default function PeriodicTable({shown, hideTable, pickElement}: PeriodicTableProps) {
  const [elements, setElements] = useState<Array<Element | undefined | null>>([])
  const [lanthanides, setLanthanides] = useState<Element[]>([])
  const [actinides, setActinides] = useState<Element[]>([])

  useEffect(() => {
    getElements().then(resp => {
      const table: Array<Element | undefined | null> = [...resp.filter(el => !['Lanthanide', 'Actinide'].includes(el.family))]
      setLanthanides(resp.filter((el => el.family == 'Lanthanide' || el.symbol == 'Lu')))
      setActinides(resp.filter((el => el.family == 'Actinide' || el.symbol == 'Lr')))

      table.splice(0, 0, null)
      for (let i = 1; i < 7; i++) {
        table.splice(table.indexOf(resp.filter(el => el.period == i && el.group == 18)[0]) + 1, 0, null)
      }

      table.splice(2, 0, undefined)
      table.splice(7, 0, undefined)
      table.splice(17, 0, undefined)
      
      setElements(table)
    })
  }, [])

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