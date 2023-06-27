import React, { useState, useEffect } from 'react'
import { Element } from '../../JSONTypes';

interface CellProps {
  element?: Element | any,
  pickElement?: (el: Element) => void,
  isLabel?: boolean
}

export default function Cell({element, pickElement, isLabel}: CellProps) {
  const style = isLabel ? {gridColumn: '1 / 4'} : {backgroundColor: '#' + element?.color, transformOrigin: 'top left'};
  const className = 'position-relative d-flex flex-column align-items-center justify-content-center p-2';

  if (pickElement) {
    element = element as Element;
    return <div
      id={element.atomic_number + '_element'}
      onClick={() => pickElement(element)}
      style={style}
      className={className}
    >
      <span>{element.atomic_number}. {element.symbol}</span>
      <span className='h6'>{element.mass}</span>
    </div>
  }
  return <div style={style} className={className}>
    <span>{element}</span>
  </div>
}