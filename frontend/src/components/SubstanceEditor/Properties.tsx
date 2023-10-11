import { useCallback } from "react";
import { Substance, Properties as SubstanceProperties } from "../../JSONTypes";

interface PropertiesProps {
  substance: Substance,
  setSubstance: (substance: Substance) => void
}

export default function Properties({substance, setSubstance}: PropertiesProps) {
  const updateProperties = useCallback((property: string) => {
    const copy = {...substance}
    copy.properties = property as SubstanceProperties;
    setSubstance(copy)
  }, [substance])

  return <div className='d-flex my-3'>
    <span>Properties:</span>
    <div className='d-flex ms-2'>
      {Object.values(SubstanceProperties).map((property, i) => 
        <div key={i} className='d-flex align-items-center mx-2' onClick={() => updateProperties(property)}>
          <input
            type='radio'
            name='property'
            id={property}
            onChange={() => {}} checked={substance.properties === property}
          />
          <label className='ms-2' htmlFor={property}>{property}</label>
        </div>
      )}
    </div>
  </div>
}