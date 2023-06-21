import React from 'react';
import Link from './Link';

interface ButtonProps {
  Button: React.ReactElement;
  color: string;
  items: string[];
  links?: string[];
  linkColor?: string
}

export default function Dropdown({Button, color, items, links, linkColor}: ButtonProps) {
  return <div className='dropdwn position-relative d-inline-block'>
    {Button}
    <div className={`dropdwn-content mt-2 d-flex flex-column transition position-absolute w-100 h5 bg-` + color}>
      {items.map((item, i) => {
        if (links) {
          return <Link key={i} to={links[i]} text={item} color={linkColor} />
        }
        return <span key={i} className='p-2'>{item}</span>
      })}
    </div>
  </div>
}