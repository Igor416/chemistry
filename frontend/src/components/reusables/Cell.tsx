import React, { useState, useEffect } from 'react'
import { Element } from '../../JSONTypes';

interface CellProps {
  element?: Element | any,
  isLabel?: boolean
}

export default function Cell({element, isLabel}: CellProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    //const filter = document.getElementById('filter') as HTMLElement
    //filter.style.zIndex = shown ? '1150' : '1050'
  }, [active])

  const style = isLabel ? {gridColumn: '1 / 4'} : {backgroundColor: '#' + element?.color};
  let className = 'd-flex border flex-column align-items-center justify-content-center p-2';

  if (element?.symbol) {
    element = element as Element;
    className += (active ? 'position-absolute' : 'position-static')
    return <div
      onClick={() => setActive(!active)}
      style={style}
      className={className}
    >
      <span>{element.atomic_number}. {element.symbol}</span>
      <span className='h5'>{element.mass}</span>
    </div>
  }
  return <div style={style} className={className}>
    <span>{element}</span>
  </div>
}