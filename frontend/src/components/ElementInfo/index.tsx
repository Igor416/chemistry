import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Element } from '../../JSONTypes';
import Atom from './Atom';
import Characteristic from './Characteristic';
import Arrow from './Arrow';
import translateElement from './translateElement';

interface ElementInfoProps {
  element?: Element,
  pickElement: (el?: Element) => void
}

export default function ElementInfo({element, pickElement}: ElementInfoProps) {
  const elementWidth = screen.availHeight * 70 / 100

  useEffect(() => {
    const table = document.getElementById('periodic_table') as HTMLElement
		table.style.opacity = element ? '0' : '1';
		const target = document.getElementById('element_container') as HTMLElement;
    if (target.firstChild) {
      for (let child of Array.from(target.children)) {
        target.removeChild(child)
      }
    }
    if (element) {
      translateElement(target, element.atomicNumber, elementWidth * element.period / 7)
    }
  }, [element])

  return <div style={{zIndex: element ? '1200' : '-1'}} className='w-100 h-100 position-absolute d-flex justify-content-evenly align-content-center h4'>
    {element && <Characteristic element={element}/>}
    <div id='element_container' className='position-relative d-flex align-items-center justify-content-cente'></div>
    <div onClick={() => pickElement(undefined)} className='position-absolute h2 end-0 my-3 mx-4'>
      <FontAwesomeIcon className='transition-l' icon={faTimes} />
    </div>
    {element && element.atomicNumber != 1 && <Arrow force={-1} atomicNumber={element.atomicNumber} pickElement={pickElement} />}
    {element && element.atomicNumber != 118 && <Arrow force={1} atomicNumber={element.atomicNumber} pickElement={pickElement} />}
    {element && <Atom element={element} elementWidth={elementWidth * element.period / 7} />}
  </div>
}