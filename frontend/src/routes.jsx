import Home from './Home'
import Account from './Account'
import Registration from './Registration'

const routes = [
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/account",
		element: <Account />
	},
	{
		path: "/registration",
		element: <Registration />
	}
]

export default routes
