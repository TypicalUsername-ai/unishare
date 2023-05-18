import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom'
import './index.css'
import routes from './routes'
import NavMenu from './components/NavMenu'
import {Provider} from 'react-redux'
import store from './components/store'

const router = createBrowserRouter(routes, {basename: '/app/'});

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
	<React.StrictMode>
		<div className="TopMenu">
			<div> UniShare </div>
			<NavMenu/>
		</div>
		<RouterProvider router={router}/>
	</React.StrictMode>,
</Provider>
)
