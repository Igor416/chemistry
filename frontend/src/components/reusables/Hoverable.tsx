import React, { useState } from 'react';

interface HoverableProps {
  text: any,
  color: string,
  isActive?: boolean
}

export default function Hoverable({text, color, isActive}: HoverableProps) {
  const [active, setActive] = useState(isActive as boolean)

  return <div onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)} className='d-flex flex-column w-100'>
    <span>{text}</span>
    <div style={{width: active ? '100%' : '0', height: '1px'}} className={`transition bg-` + color}></div>
  </div>
}