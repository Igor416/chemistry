import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Element, Klass, Substance } from "../../JSONTypes";
import { getElementsList, getKlassesList } from "../../api";
import Input from "./Input";
import Characteristics from "./Characteristics";
import Properties from "./Properties";
import SubstanceType from "./SubstanceType";
import OrganicEditor from "./OrganicEditor";
import CovalentEditor from "./CovalentEditor";
import IonicEditor from "./IonicEditor";

interface SubstanceEditorProps {
  substance: Substance,
  setSubstance: (substance: Substance) => void,
  substanceEditorShown: boolean,
  showSubstanceEditor: (value: boolean) => void,
}

export interface EditorProps {
  allElements: Element[],
  updateFormula: (name: string, formula: string) => void,
}

export default function SubstanceEditor({substance, setSubstance, substanceEditorShown, showSubstanceEditor}: SubstanceEditorProps) {
  const [allElements, setAllElements] = useState<Element[]>([])
  const [allKlasses, setAllKlasses] = useState<Klass[]>([])

  const [pickedKlass, pickKlass] = useState<Klass>(substance.klass)
  const [isCovalent, setAsCovalent] = useState(false)

  useEffect(() => {
    getElementsList().then(setAllElements)
    getKlassesList().then(setAllKlasses)
  }, [])

  useEffect(() => {
    const copy = {...substance}
    copy.klass = pickedKlass;
    if (pickedKlass.isOrganic) {
      setAsCovalent(true)
    }
    setSubstance(copy)
  }, [pickedKlass])

  const findKlass = useCallback((name: string) => {
    const klass = allKlasses.filter(klass => klass.name === name)
    if (klass.length > 0) {
      return klass[0]
    }
    return pickedKlass
  }, [allKlasses])

  const updateFormula = (name: string, formula: string) => {
    const copy = {...substance}
    copy.name = name;
    copy.formula = formula;
    setSubstance(copy)
  }

  return <div
    style={{
      zIndex: substanceEditorShown ? '1200' : '-1'
    }}
    className={`transition-l ${substanceEditorShown ? 'shown' : 'hidden-end'} w-100 h-100 position-absolute d-flex`}
  >
    <datalist id='elements'>
      {allElements.map((el, i) => <option key={i} value={el.symbol} />)}
    </datalist>
    <datalist id='klasses'>
      {allKlasses.map((klass, i) => <option key={i} value={klass.name} />)}
    </datalist>
    <div className='bg-white d-flex justify-content-between w-100 p-5'>
      <div className='d-flex flex-column p-5 h5 col-5'>
        <div className='d-flex justify-content-between mb-2 col-12'>
          <span>Name:</span>
          <span>{substance.name}</span>
        </div>
        <Input label='Klass' id='klass' list='klasses' onChange={e => pickKlass(findKlass(e.target.value))} />
        <SubstanceType isCovalent={isCovalent} setAsCovalent={setAsCovalent} isOrganic={pickedKlass.isOrganic} />
        <Properties substance={substance} setSubstance={setSubstance} />
        <Characteristics substance={substance} setSubstance={setSubstance} />
      </div>
      {allElements.length > 0 && <div className='d-flex flex-column align-items-center p-5 col-5'>
        <span className='h2'>Formula: <span dangerouslySetInnerHTML={{__html: substance.formula}}></span></span>
        {
          substance.klass.isOrganic
          ?
          <OrganicEditor allElements={allElements} updateFormula={updateFormula} />
          :
          isCovalent
          ?
          <CovalentEditor allElements={allElements} updateFormula={updateFormula} />
          :
          <IonicEditor allElements={allElements} updateFormula={updateFormula} />
        }
      </div>}
    </div>
    <div onClick={() => showSubstanceEditor(false)} className='position-absolute d-flex flex-column h2 end-0 my-3 mx-4'>
      <FontAwesomeIcon className='transition-l' icon={faTimes} />
    </div>
  </div>
}