import React from 'react';

interface ButtonProps {
  text: string;
  color: string;
  inverted?: boolean;
  extraClassNames?: string;
  extraAttributes?: {
    [key: string]: string
  }
  callBack?: () => void
}

export default function Button({text, color, inverted, extraClassNames, extraAttributes, callBack}: ButtonProps) {
  const className = inverted ? `button-inverted border-${color} text-${color} bg-whitesmoke` : `button border-whitesmoke bg-${color}`;
  return <button
    onClick={callBack}
    className={`transition outline-0 p-2 ${className} ${color}-button ` + extraClassNames}
    {...extraAttributes}
  >{text}</button>
}