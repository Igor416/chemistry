import React, { useState, useEffect } from 'react'
import Menu from './Menu';
import PeriodicTable from './PeriodicTable';
import { Element } from '../JSONTypes';
import ElementInfo from './ElementInfo';

export default function App() {
	const [tableShown, toggleTable] = useState(false);
	const [pickedElement, pickElement] = useState<Element>();

	useEffect(() => {
		const filter = document.getElementById('filter') as HTMLElement
		filter.classList.toggle('hidden-end')
		filter.classList.toggle('shown')
	}, [tableShown])

	return (
		<div className='d-flex'>
			<Menu showTable={toggleTable}/>
			<PeriodicTable shown={tableShown} hideTable={toggleTable} pickElement={pickElement} />
			<ElementInfo element={pickedElement} pickElement={pickElement}/>
		</div>
	);
}
