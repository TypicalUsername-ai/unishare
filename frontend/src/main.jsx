import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom'
import Home from './Home'
import './index.css'
import Account from './Account'

const router = createBrowserRouter([
	{
		path: "/app/home",
		element: <Home />,
	},
	{
		path: "/app/account",
		element: <Account />,
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
