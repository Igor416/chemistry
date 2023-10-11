import { useEffect, useState, useCallback } from 'react'
import { Klass } from '../JSONTypes'
import { getKlass } from '../api'
import { useParams } from 'react-router-dom'
import Link from './reusables/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import Hoverable from './reusables/Hoverable'

interface KlassProps {
  editable: boolean
}

export default function Klass({editable}: KlassProps) {
  const params = useParams()
  const [currentRow, setCurrentRow] = useState(-1)
  const [klass, setKlass] = useState<Klass>({
    name: params.klass as string,
    isOrganic: false,
    reactsWith: [],
    uniqueReactions: [],
    image: '',
    article: ''
  })

  useEffect(() => {
    getKlass(klass.name).then(data => {
      setKlass(data);
      const el = document.getElementById('article') as HTMLElement
      if (el) {
        el.innerHTML = data.article
      }
    })
  }, [])

	const updateArticle = useCallback((text: string) => {
		const copy = {...klass};
    copy.article = text;
    setKlass(copy);
	}, [])

  return <div className='d-flex flex-column mt-5 h4'>
    <div className='d-flex justify-content-between align-items-end mb-2'>
      <h1>{klass.name}</h1>
      <div className='d-flex align-items-end h3'>
        <Link className='text-decoration-none' to={editable ? '/klass/' + klass.name : 'editor'} color='light-blue'>
          <Hoverable color='light-blue'>{editable ? 'Save' : 'Edit'}</Hoverable>
        </Link>
        <FontAwesomeIcon icon={editable ? faSave : faPencilAlt} color='var(--light-blue)' className='ms-2' />
      </div>
    </div>
    {editable
    ?
    <div className='d-flex'>
      <div className='d-flex flex-column p-2 text-end'>
        {klass.article.split('\n').map((_, i) => {
          return <span key={i} className={i === currentRow ? ' text-light-blue' : ''}>{i + 1}.</span>
        })}
      </div>
      <textarea
        className='p-2 flex-grow-1 border-0 outline-0'
        value={klass.article}
        onChange={(e) => updateArticle(e.target.value)}
        rows={klass.article.split('\n').length}
        onFocus={() => setCurrentRow(0)}
        onBlur={() => setCurrentRow(-1)}
        onKeyUp={(e) => setCurrentRow((e.target as HTMLTextAreaElement).value.slice(0, (e.target as HTMLTextAreaElement).selectionStart).split('\n').length - 1)}
      ></textarea>
    </div>
    :
    <div id='article' className='d-flex flex-column'></div>
    }
  </div>
}
