import { Element } from "../../JSONTypes"

interface CharacteristicProps {
  element: Element
}

export default function Characteristic({element}: CharacteristicProps) {
  return <div className='d-flex flex-column justify-content-center h4'>
    <div className='d-flex'>
      <span className='h2 me-4'>{element.name} ({element.symbol})</span>
      <img className='img-fluid' src={element.image} />
    </div>
    <table>
      <tr>
        <td>Ar({element.symbol})</td>
        <td className='text-end'>{element.mass}</td>
      </tr>
      <tr style={{backgroundColor: '#' + element.color}}>
        <td>Electronegativity</td>
        <td className='text-end'>{element.electronegativity > 0 ? element.electronegativity : 'no data'}</td>
      </tr>
      <tr>
        <td>Family</td>
        <td className='d-flex align-items-end justify-content-end'>
          <div style={{backgroundColor: '#' + element.color}} className='rounded-circle p-2 mx-2'>
            <div className='rounded-circle p-1 bg-whitesmoke'></div>
          </div>
          <span>{element.family}</span>
        </td>
      </tr>
      <tr style={{backgroundColor: '#' + element.color}}>
        <td>Configuration ({element.block}-block)</td>
        <td className='text-end'>
        {element.configuration.map((shell, i) => {
          return <span key={i} className='ms-2'>{shell.split('#')[0]}<sup>{shell.split('#')[1]}</sup></span>
        })}
        </td>
      </tr>
      <tr>
        <td>Oxidations</td>
        <td className='text-end'>
        {element.oxidations.map((oxidation, i) => <span className='ms-2' key={i}>{element.symbol}<sup>{oxidation}</sup></span>)}
        {element.oxidations.length == 0 && <span className='ms-2'>-</span>}
        </td>
      </tr>
    </table>
  </div>
}