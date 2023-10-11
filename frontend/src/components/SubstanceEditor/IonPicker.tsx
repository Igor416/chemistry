import { useCallback, ChangeEvent, useState } from "react";
import { Element, Ion } from "../../JSONTypes";
import Input from "./Input";
import Hoverable from "../reusables/Hoverable";

interface IonProps {
  allElements: Element[],
  allIons: Ion[],
  ion: Ion,
  setIon: (ion: Ion) => void,
  positive: boolean
}

export default function IonPicker({allElements, allIons, ion, setIon, positive}: IonProps) {
  const updateElementSymbol = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const elements = allElements.filter(element => element.symbol.toLowerCase().includes(e.target.value.toLowerCase()))
    if (elements.length > 0) {
      for (let element of elements) {
        const first = allIons.filter(ion => ion.mainElement.atomicNumber === element.atomicNumber)[0]
        if (first) {
          setIon(first);
          break
        }
      }
    }
  }, [allIons, ion])
  
  return <div className='d-flex align-items-start my-2'>
    <Input
      className='col-6'
      label={`${positive ? 'Cation' : 'Anion'} Main Element`}
      id={`${positive ? 'cation' : 'anion'}_main_element`}
      list='elements'
      size={2}
      onChange={updateElementSymbol}
    />
    <div className='col-1' />
    <div className='col-5 d-flex flex-column'>
      {allIons.filter(option => option.mainElement.atomicNumber === ion.mainElement.atomicNumber).map((option, i) =>
        <Hoverable key={i} color='light-blue' isActive={ion.name == option.name}>
          <div className='d-flex my-2 text-black' onClick={() => setIon(option)}>{option.name}</div>
        </Hoverable>
      )}
    </div>
  </div>
}