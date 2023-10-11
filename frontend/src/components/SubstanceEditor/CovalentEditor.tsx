import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react"
import { ElementCount } from "../../JSONTypes"
import Input from "./Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { EditorProps } from ".";

export default function CovalentEditor({allElements, updateFormula}: EditorProps) {
  const dummy = {
    element: allElements[0],
    count: 2,
    oxidation: 1
  }
  const [pickedElement, pickElement] = useState(0);
  const [elements, setElements] = useState<ElementCount[]>([dummy])

  useEffect(() => {
    let formula = `<span ${validateFormula() ? '' : "class='text-terra-cotta'"}>`
    for (let element of elements) {
      formula += `${element.element.symbol}<span class='formula'><sup>${element.oxidation > 0 ? '+' + element.oxidation : element.oxidation}</sup><sub${element.count == 1 ? ' style="color: white"' : ''}>${element.count}</sub></span>`
    }
    formula += '</span>'
    updateFormula('', formula);
  }, [elements])

  const validateFormula = () => {
    if (elements.length === 1) {
      if (['H', 'N', 'O', 'F', 'Cl', 'I', 'Br'].includes(elements[0].element.symbol)) {
        return elements[0].count === 2 && elements[0].oxidation === 1
      }
      return elements[0].count === 1  && elements[0].oxidation === 0
    }
    let sum = 0;
    for (let el of elements) {
      if (!el.element.oxidations.includes(el.oxidation)) {
        return false
      }
      sum += el.count * el.oxidation
      console.log(sum)
    }
    
    return sum === 0;
  }

  const updateElementSymbol = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const element = allElements.filter(element => element.symbol.toLowerCase().includes(e.target.value.toLowerCase()))
    if (element.length > 0) {
      const copy = [...elements];
      const i = Number(e.currentTarget.dataset['id']);
      copy[i].element = element[0]
      copy[i].oxidation = element[0].oxidations[0]
      setElements(copy.sort((a, b) => a.element.electronegativity - b.element.electronegativity));
      pickElement(i);
    }
  }, [elements, pickedElement])

  const updateIntValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const copy = [...elements];
    const key = e.target.dataset['key'] as 'count' | 'oxidation';
    const i = Number(e.currentTarget.dataset['id']);
    copy[i][key] = Number(e.currentTarget.value);
    setElements(copy);
    pickElement(i);
  }, [elements, pickedElement])

  const addElement = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const copy = [...elements];
    const i = Number(e.currentTarget.dataset['id']);
    copy.splice(i, 0, {...dummy});
    setElements(copy);
    pickElement(i + 1)
  }, [elements, pickedElement])

  const deleteElement = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const copy = [...elements];
    const i = Number(e.currentTarget.dataset['id']);
    copy.splice(i, 1);
    setElements(copy);
    pickElement(i - 1)
  }, [elements, pickedElement])

  return <div className='col-12'>
    {elements.map((el, i) => 
      <div key={i} className='d-flex my-2'>
        <Input
          className='col-3'
          label='Element'
          id={`element${i}`}
          list='elements'
          size={2}
          data={{'data-id': i}}
          value={el.element.symbol}
          onChange={updateElementSymbol}
        />
        <div className='col-1' />
        <Input 
          className='col-2'
          label='Count'
          id={`count${i}`}
          size={1}
          data={{'data-id': i, 'data-key': 'count'}}
          value={el.count}
          onChange={updateIntValue}
        />
        <div className='col-1' />
        <Input
          className='col-2'
          label='Oxidation'
          id={`oxidation${i}`}
          size={1}
          data={{'data-id': i, 'data-key': 'oxidation'}}
          value={el.oxidation}
          onChange={updateIntValue}
        />
        <div className='col-1' />
        <div className='col-2 d-flex justify-content-evenly'>
          {elements.length < 5 && <div data-id={i} onClick={addElement}>
            <FontAwesomeIcon icon={faPlus} />
          </div>}
          {elements.length > 1 && <div data-id={i} onClick={deleteElement}>
            <FontAwesomeIcon icon={faMinus} />
          </div>}
        </div>
      </div>
    )}
  </div>
}
