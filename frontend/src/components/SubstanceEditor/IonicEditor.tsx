import { useEffect, useState } from "react"
import { Ion } from "../../JSONTypes"
import { getAnions, getCations } from "../../api"
import IonPicker from "./IonPicker"
import { EditorProps } from "."

export default function IonicEditor({allElements, updateFormula}: EditorProps) {
  const [allCations, setAllCations] = useState<Ion[]>([])
  const [allAnions, setAllAnions] = useState<Ion[]>([])
  const [cation, setCation] = useState<Ion>({
    name: 'hydrogen',
    elements: [{
      element: allElements[0],
      count: 1,
      oxidation: 1
    }],
    color: 'transparent',
    oxidation: 1,
    mainElement: allElements[0]
  })
  const [anion, setAnion] = useState<Ion>({
    name: 'hydroxide',
    elements: [{
      element: allElements[7],
      count: 1,
      oxidation: -2
    }, {
      element: allElements[0],
      count: 1,
      oxidation: 1
    }],
    color: 'transparent',
    oxidation: -1,
    mainElement: allElements[7]
  })

  useEffect(() => {
    getCations().then(setAllCations);
    getAnions().then(setAllAnions);
  }, [])

  useEffect(() => {
    const renderIon = (ion: Ion, other: Ion) => {
      let formula = '<span>['
      for (let element of ion.elements) {
        formula += `${element.element.symbol}<sub>${element.count == 1 ? '' : element.count}</sub>`
      }
      const count = -other.oxidation / ion.oxidation
      formula += ']</span><span class="formula">' +
        `<sup>${Math.abs(ion.oxidation) + (ion.oxidation < 0 ? '-' : '+')}</sup>` +
        `<sub${Math.abs(other.oxidation) === 1 ? ' style="color: white"' : ''}>` +
        (count - Math.trunc(count) == 0 ? Math.trunc(count) : Math.abs(other.oxidation)) +
      '</sub></span>'
      return formula
    }
    updateFormula(cation.name + ' ' + anion.name, renderIon(cation, anion) + renderIon(anion, cation));
  }, [cation, anion])

  return <div className='d-flex flex-column col-12'>
    <IonPicker allElements={allElements} allIons={allCations} ion={cation} setIon={setCation} positive={true} />
    <IonPicker allElements={allElements} allIons={allAnions} ion={anion} setIon={setAnion} positive={false} />
  </div>
}