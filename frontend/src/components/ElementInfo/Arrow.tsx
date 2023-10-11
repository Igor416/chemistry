import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getElement } from "../../api"
import { Element } from "../../JSONTypes"

interface ArrowProps {
  force: 1 | -1,
  atomicNumber: number,
  pickElement: (el: Element) => void
}

export default function Arrow({force, atomicNumber, pickElement}: ArrowProps) {
  return <div
    style={{zIndex: 1250}}
    onClick={() => getElement(atomicNumber + force).then(pickElement)}
    className={'position-absolute h2 top-50 mx-3 ' + (force > 0 ? 'end' : 'start') + '-0'}>
    <FontAwesomeIcon icon={force > 0 ? faArrowRight : faArrowLeft} />
  </div>
}