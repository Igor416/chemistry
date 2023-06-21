import React, { useState, useEffect } from 'react'
import Menu from './Menu';
import PeriodicTable from './PeriodicTable';
import { Element } from '../JSONTypes';

export default function App() {
	const [tableShown, toggleTable] = useState(false);

	useEffect(() => {
		const filter = document.getElementById('filter') as HTMLElement
		filter.classList.toggle('hidden')
		filter.classList.toggle('shown')
	}, [tableShown])

	return (
		<div className="d-flex">
			<Menu showTable={toggleTable}/>
			<PeriodicTable shown={tableShown} hideTable={toggleTable} />
		</div>
	);
}
