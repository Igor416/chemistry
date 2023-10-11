import { useState } from "react";
import { EditorProps } from ".";
import Input from "./Input";
import { Roots } from "./Nomenclature";

export default function OrganicEditor({allElements, updateFormula}: EditorProps) {
  const [suffix, setSuffix] = useState('an');
  const [suffixBond, setSuffixBond] = useState(1);
  const [root, setRoot] = useState<Roots>(Roots.Methane);
  const [isCycle, setAsSycle] = useState(false)

  return <div className='d-flex col-12 flex-column'>
    <Input
      label="Suffix"
      id="suffix"
      onChange={() => {}}
    />
  </div>
}