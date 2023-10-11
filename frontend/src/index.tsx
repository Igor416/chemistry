import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faPlus,
	faTimes,
	faFlask
} from '@fortawesome/free-solid-svg-icons';

library.add.apply(library, [
	faPlus,
	faTimes,
	faFlask
]);

import App from './components/App';
import Home from './components/Home';
import Klass from './components/Klass';

const root = createRoot(
	document.getElementById('main') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route path='' element={<Home />} />
					<Route path='klass/:klass/editor' element={<Klass editable={true} />} />
					<Route path='klass/:klass' element={<Klass editable={false} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
