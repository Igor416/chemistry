import { useCallback } from "react";
import { Substance } from "../../JSONTypes";
import Input from "./Input";

interface CharacteristicsProps {
  substance: Substance,
  setSubstance: (substance: Substance) => void
}

export default function Characteristics({substance, setSubstance} : CharacteristicsProps) {
  const updateStringProperty = useCallback((key: 'color' | 'smell' | 'trivialNames', value: string) => {
    const copy = {...substance}
    copy[key] = value;
    setSubstance(copy)
  }, [substance])

  return <div className='d-flex flex-column my-3'>
    <Input className='my-2' label='Color' id='color' value={substance.color} onChange={e => updateStringProperty('color', e.target.value)}/>
    <Input className='my-2' label='Smell' id='smell' value={substance.smell} onChange={e => updateStringProperty('smell', e.target.value)}/>
    <Input className='my-2' label='Trivial Names' id='trivialNames' value={substance.trivialNames} onChange={e => updateStringProperty('trivialNames', e.target.value)}/>
  </div>
}