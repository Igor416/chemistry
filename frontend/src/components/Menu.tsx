import React, { useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask } from '@fortawesome/free-solid-svg-icons'
import { getKlasses } from '../api';
import { Klass } from '../JSONTypes';

import Button from './reusables/Button'
import Dropdown from './reusables/Dropdown'
import Hoverable from './reusables/Hoverable'

interface MenuProps {
  showTable: (value: boolean) => void
}

export default function Menu({showTable}: MenuProps) {
  const [klasses, setKlasses] = useState<Klass[]>()

  useEffect(() => {
    getKlasses().then(resp => setKlasses(resp))
  }, [])

  return (
    <div className='d-flex justify-content-between align-items-center w-100 bg-light-blue h3 p-4'>
      <div className='d-flex flex-nowrap align-items-center h1'>
        <FontAwesomeIcon className='transition-l' icon={faFlask} />
        <span className='ms-2'>Chemist.io</span>
      </div>
      {klasses && <Dropdown
        Button={<Hoverable text='Non Organic Substances' color='light-blue' />}
        items={klasses.filter(el => !el.is_organic).map(el => el.name)}
        links={klasses.filter(el => !el.is_organic).map(el => '/klass/' + el.name)}
        color='light-blue'
        linkColor='whitesmoke'
      />}
      {klasses && <Dropdown
        Button={<Hoverable text='Organic Substances' color='light-blue' />}
        items={klasses.filter(el => el.is_organic).map(el => el.name)}
        links={klasses.filter(el => !el.is_organic).map(el => '/klass/' + el.name)}
        color='light-blue'
        linkColor='whitesmoke'
      />}
      <Dropdown Button={<Hoverable text='Problems' color='light-blue' />} items={['Masses']} color='light-blue' />
      <Button text='Periodic Table' color='light-blue' callBack={() => showTable(true)} />
    </div>
  )
}