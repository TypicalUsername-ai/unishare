import Home from './Home'
import Account from './Account'
import Registration from './Registration'

const routes = [
	{
		path: "/home",
		element: <Home />
	},
	{
		path: "/account",
		element: <Account />
	},
	{
		path: "/register",
		element: <Registration />
	}
]

export default routes
