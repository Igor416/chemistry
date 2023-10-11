import { ReactNode, useEffect, useState } from 'react';

interface HoverableProps {
  children: ReactNode | ReactNode[]
  color: string,
  isActive?: boolean
}

export default function Hoverable({children, color, isActive = false}: HoverableProps) {
  const [active, setActive] = useState(isActive as boolean)

  useEffect(() => {
    setActive(isActive)
  }, [isActive])

  return <div onMouseOver={() => setActive(true)} onMouseOut={() => setActive(isActive || false)} className={'d-flex flex-column w-100 text-' + color}>
    {children}
    <div style={{width: active ? '100%' : '0', height: '1px'}} className={`transition bg-` + color}></div>
  </div>
}