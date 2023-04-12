import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom'
import './index.css'
import routes from './routes'
import NavMenu from './components/NavMenu'

const router = createBrowserRouter(routes, {basename: '/app/'});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<div className="TopMenu">
		<div> UniShare </div>
		<NavMenu/>
	</div>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
