import { useState, useEffect } from 'react'
import Menu from './Menu';
import PeriodicTable from './PeriodicTable';
import { Element, Properties, Substance } from '../JSONTypes';
import ElementInfo from './ElementInfo';
import { Outlet } from 'react-router-dom';
import SubstanceEditor from './SubstanceEditor';

export default function App() {
	const dummySubstance = {
		formula: '',
		name: '',
		color: 'transparent',
		smell: 'without',
		trivialNames: '',
		properties: Properties.NEUTRAL,
		klass: {
			name: '',
			isOrganic: false,
			reactsWith: [],
			uniqueReactions: [],
			article: '',
			suffix: '',
			image: ''
		},
		article: '',
		image: ''
	}

	const [substanceEditorShown, showSubstanceEditor] = useState(false);
	const [pickedSubstance, pickSubstance] = useState<Substance>(dummySubstance);
	const [tableShown, toggleTable] = useState(false);
	const [pickedElement, pickElement] = useState<Element>();

	useEffect(() => {
		const filter = document.getElementById('filter') as HTMLElement
		filter.classList.toggle('hidden-end')
		filter.classList.toggle('shown')
	}, [substanceEditorShown])

	useEffect(() => {
		const filter = document.getElementById('filter') as HTMLElement
		filter.classList.toggle('hidden-end')
		filter.classList.toggle('shown')
	}, [tableShown])

	return (
		<div className='d-flex flex-column'>
			<Menu showSubstanceEditor={showSubstanceEditor} showTable={() => toggleTable(true)} />
			<SubstanceEditor
				substance={pickedSubstance}
				setSubstance={pickSubstance}
				substanceEditorShown={substanceEditorShown}
				showSubstanceEditor={showSubstanceEditor}
			/>
			<PeriodicTable shown={tableShown} hideTable={toggleTable} pickElement={pickElement} />
			<ElementInfo element={pickedElement} pickElement={pickElement}/>
			<div className='d-flex w-100'>
				<div className='col-1'></div>
				<div className='col-10'>
					<Outlet />
				</div>
				<div className='col-1'></div>
			</div>
		</div>
	);
}
