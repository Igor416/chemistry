import { Element } from '../../JSONTypes';

interface AtomProps {
  element: Element
  elementWidth: number
}

export default function Atom({element, elementWidth}: AtomProps) {
  const radius = elementWidth / 2 * (element.period > 5 ?  Math.sqrt(2) : 2);
  
  return <div className='d-none'>
    <div style={{zIndex: 1250}} id='center' className='rounded-circle p-2 bg-whitesmoke'></div>
    <div
      id='nucleus'
      style={{
        zIndex: 1250,
        width: radius,
        height: radius,
        marginRight: elementWidth / 2 - radius,
        marginTop: elementWidth / 2 - radius,
        transform: 'rotate(-45deg)',
        transformOrigin: 'bottom left',
        borderBottom: '1px solid black'
      }} className='end-0 top-0 position-absolute d-flex align-items-end justify-content-end'>
      <span className='text-nowrap'>{element.atomicNumber}p<sup>+</sup> {Math.round(element.mass - element.atomicNumber)}n</span>
    </div>
    {element.electrons.map((num, i) => {
      const shell = element.period - i
      const width = elementWidth / element.period * shell;
      const margin = (elementWidth - width) / 2
      return <div key={i} style={{width: width, height: width, left: margin, right: margin}} className='circle bg-dark rounded-circle position-absolute d-flex justify-content-center align-items-center p-1'>
        <div style={{backgroundColor: '#' + element.color}} className='rounded-circle d-flex justify-content-center align-items-end text-center w-100 h-100'>
          <span>{num}e<sup>-</sup></span>
        </div>
      </div>
    })}
  </div>
}