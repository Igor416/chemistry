import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
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

const root = createRoot(
	document.getElementById('main') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
