import { useState, useEffect } from "react";
import { getElements } from "../../api";
import { Element } from '../../JSONTypes';

export default function useTable() {
  const [elements, setElements] = useState<Array<Element | undefined | null>>([])
  const [lanthanides, setLanthanides] = useState<Element[]>([])
  const [actinides, setActinides] = useState<Element[]>([])

  useEffect(() => {
    getElements().then(resp => {
      const table: Array<Element | undefined | null> = resp.filter(el => !['Lanthanide', 'Actinide'].includes(el.family))
      setLanthanides(resp.filter((el => el.family == 'Lanthanide' || el.symbol == 'Lu')))
      setActinides(resp.filter((el => el.family == 'Actinide' || el.symbol == 'Lr')))

      table.splice(0, 0, null)
      for (let i = 1; i < 7; i++) {
        table.splice(table.indexOf(resp.filter(el => el.period == i && el.group == 18)[0]) + 1, 0, null)
      }

      table.splice(2, 0, undefined)
      table.splice(7, 0, undefined)
      table.splice(17, 0, undefined)
      
      setElements(table)
    })
  }, [])

  return {
    elements: elements,
    lanthanides: lanthanides,
    actinides: actinides
  }
}