import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask, faSearch } from '@fortawesome/free-solid-svg-icons'

import Link from './reusables/Link'
import Hoverable from './reusables/Hoverable'

interface MenuProps {
  showSubstanceEditor: (value: boolean) => void,
  showTable: () => void
}

export default function Menu({showSubstanceEditor, showTable}: MenuProps) {
  const [search, setSearch] = useState('')

  return (
    <div className='d-flex justify-content-between align-items-center w-100 bg-white py-4'>
      <div className='d-flex flex-nowrap justify-content-center align-items-center h3 col-2'>
        <FontAwesomeIcon className='transition-l' icon={faFlask} />
        <Link to='/'>
          Chemist.io
        </Link>
      </div>
      <div className='d-flex flex-nowrap justify-content-start col-4 h5'>
        <div className='me-4' onClick={() => showSubstanceEditor(true)}>
          <Hoverable color='light-blue'>Create Substance</Hoverable>
        </div>
        <Link className='mx-4' to='/history'>
          <Hoverable color='light-blue'>History</Hoverable>
        </Link>
        <Link className='ms-4' to='/klasses'>
          <Hoverable color='light-blue'>Substance Classes</Hoverable>
        </Link>
      </div>
      <div className='d-flex flex-nowrap col-4'>
        <input
          className='p-3 rounded-end rounded-pill bg-whitesmoke border-0 outline-0 w-100'
          type='text'
          id='search_query_input'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className='p-3 rounded-start rounded-pill bg-whitesmoke border-0 outline-0'>
          <FontAwesomeIcon icon={faSearch} className='text-light-blue' />
        </button>
      </div>
      <div onClick={showTable} className='col-2 d-flex justify-content-center'>
        <img className='col-3' src='/static/images/icon.png' />
      </div>
    </div>
  )
}