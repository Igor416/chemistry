import { ChangeEvent } from "react"

interface InputProps {
  className?: string,
  innerClassName?: string,
  label: string,
  id: string,
  list?: string,
  size?: number,
  data?: Object,
  value?: string | number,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({className = '', innerClassName = '', label, id, list, size = 20, data={}, value, onChange} : InputProps) {
  return <div className={'d-flex justify-content-between ' + className}>
  <label htmlFor={id}>{label}:</label>
  <input
    className={'border-0 border-bottom outline-0 border-dark ms-3 ' + innerClassName}
    size={size}
    id={id}
    list={list}
    value={value}
    onChange={onChange}
    {...data}
  />
</div>
}