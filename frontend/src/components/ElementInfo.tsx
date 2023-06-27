import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getElement } from '../api';
import { Element } from '../JSONTypes';
import Atom from './reusables/Atom';

interface ElementInfoProps {
  element?: Element,
  pickElement: (el?: Element) => void
}

export default function ElementInfo({element, pickElement}: ElementInfoProps) {
  let elementWidth = screen.availHeight * 70 / 100;

  useEffect(() => {
    const table = document.getElementById('periodic_table') as HTMLElement
		table.style.opacity = element ? '0.3' : '1';
		const target = document.getElementById('element_container') as HTMLElement;
    if (target.firstChild) {
      for (let child of Array.from(target.children)) {
        target.removeChild(child)
      }
    }
    if (element) {
      elementWidth *= element.period / 7
      const original = document.getElementById(element.atomic_number + '_element') as HTMLElement;
      const clone = original.cloneNode() as HTMLElement;
      const circles = document.getElementsByClassName('circle')

      //get coords
      const { left: x0, top: y0, width: width, height: height } = original.getBoundingClientRect();
      target.append(clone);
      const { left: x1, top: y1 } = clone.getBoundingClientRect();

      //set styles
			clone.style.height = clone.style.width = elementWidth + 'px'
			clone.style.borderRadius = '50%'

      //animate
      clone.animate([
        { transform: `translate(${x0 - x1}px, ${y0 - y1}px)`, borderRadius: '100%', height: height + 'px', width: width + 'px' },
        { transform: 'translate(0, 0)', borderRadius: '50%', height: elementWidth + 'px', width: elementWidth + 'px' },
      ], {
        duration: 400,
        easing: 'linear',
      });
      
      setTimeout(() => {
        Array.of(...circles).forEach(circle => target.appendChild(circle.cloneNode(true)))
        clone.appendChild(document.getElementById('center')?.cloneNode(true) as Node)
        clone.appendChild(document.getElementById('nucleus')?.cloneNode(true) as Node)
        Array.of(...document.getElementsByClassName('arrow')).forEach(el => (el as HTMLElement).style.zIndex = '1250')
      }, 400)
    }
  }, [element])

  return <div style={{zIndex: element ? '1200' : '-1'}} className='w-100 h-100 position-absolute d-flex justify-content-evenly align-content-center h4'>
    {element && <div className='d-flex flex-column justify-content-center h4'>
      <span className='h2'>{element.name} ({element.symbol})</span>
      <span>Ar({element.symbol}) = {element.mass}</span>
      <div className='d-flex flex-nowrap align-items-center'>
        <span>Family: </span>
        <div style={{backgroundColor: '#' + element.color}} className='rounded-circle p-2 mx-2'>
          <div className='rounded-circle p-1 bg-whitesmoke'></div>
        </div>
        <span>{element.family}</span>
      </div>
      <div className='d-flex flex-nowrap'>
        <span>Configuration ({element.block}-block):</span>
        {element.configuration.map((shell, i) => {
          return <span key={i} className='ms-2'>{shell.split('#')[0]}<sup>{shell.split('#')[1]}</sup></span>
        })}
      </div>
      <div className='d-flex flex-nowrap align-items-center'>
        <span>Oxidations: </span>
        {element.oxidations.map((oxidation, i) => <span className='ms-2' key={i}>{element.symbol}<sup>{oxidation}</sup></span>)}
        {element.oxidations.length == 0 && <span className='ms-2'>-</span>}
      </div>
    </div>}
    <div id='element_container' className='position-relative d-flex align-items-center justify-content-cente'></div>
    <div onClick={() => pickElement(undefined)} className='position-absolute h2 end-0 my-3 mx-4'>
      <FontAwesomeIcon className='transition-l' icon={faTimes} />
    </div>
    {element && element.atomic_number != 1 && <div
      onClick={() => getElement(element.atomic_number - 1).then(resp => pickElement(resp))}
      className='arrow position-absolute h2 start-0 top-50 ms-3'>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>}
    {element && element.atomic_number != 118 && <div
      onClick={() => getElement(element.atomic_number + 1).then(resp => pickElement(resp))}
      className='arrow position-absolute h2 end-0 top-50 me-3'>
      <FontAwesomeIcon icon={faArrowRight} />
    </div>}
    {element && <Atom element={element} elementWidth={elementWidth * element.period / 7} />}
  </div>
}