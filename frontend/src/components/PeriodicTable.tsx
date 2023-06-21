import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getElements } from '../api';
import { Element } from '../JSONTypes';

import Cell from './reusables/Cell';

interface PeriodicTableProps {
  shown: boolean;
  hideTable: (value: boolean) => void
}

export default function PeriodicTable({shown, hideTable}: PeriodicTableProps) {
  const [elements, setElements] = useState<Array<Element | undefined | null>>([])
  const [lanthanides, setLanthanides] = useState<Element[]>([])
  const [actinides, setActinides] = useState<Element[]>([])

  useEffect(() => {
    getElements().then(resp => {
      const table: Array<Element | undefined | null> = []
      setLanthanides(resp.filter((el => el.family == 'Lanthanide' || el.symbol == 'La')))
      setActinides(resp.filter((el => el.family == 'Actinide' || el.symbol == 'Ac')))
      for (let i = 0; i < 7 * 18; i++) {
        table[i] = undefined
      }

      for (let i = 0; i < 7 * 18; i++) {
        if (resp[i]) {
          if (resp[i].period > 5 && resp[i].group == 3) {
            continue
          }
          table[resp[i].group - 1 + (resp[i].period - 1) * 18] = resp[i]
        }
      }

      for (let i = 0; i < 7; i++) {
        table.splice(i * 19, 0, null)
      }
      setElements(table)
    })
  }, [])

  const nums = Array.from(Array(18).keys())

  return (
    <div
      id='periodic_table'
      style={{
        gridTemplateColumns: 'auto '.repeat(19),
        zIndex: 1100
      }}
      className={`transition-l ${shown ? 'shown' : 'hidden'} position-absolute d-grid w-100 h-100 p-5 h4`}
    >
      {nums.map(el => <Cell key={el} element={el === 0 ? undefined : el} />)}
      <Cell element='18' />
      {elements.map((el, i) => {
        if (el === undefined) {
          return <Cell key={i} element={i == 98 ? '*' : (i == 117 ? '**' : undefined)} />
        } else if (el === null) {
          return <Cell key={i} element={i % 18 + 1} />
        }
        return <Cell key={i} element={el} />
      })}
      {nums.map(el => <Cell key={el} />)}
      <Cell element='Lanthanides *' isLabel={true} />
      {lanthanides.map((el, i) => <Cell key={i} element={el} />)}
      <Cell />
      <Cell element='Actinides **' isLabel={true} />
      {actinides.map((el, i) => <Cell key={i} element={el} />)}
      <Cell />
      <div onClick={() => hideTable(false)} className='position-absolute h2 end-0 my-3 mx-4'>
        <FontAwesomeIcon className='transition-l' icon={faTimes} />
      </div>
    </div>
  )
}