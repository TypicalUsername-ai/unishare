import Home from './Home'
import Account from './Account'
import Registration from './Registration'
import Login from './Login'
import Loggedin from './Loggedin'
import Registrationsuc from './registrationsuc'



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
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/loggedin",
		element: <Loggedin />
	},
	{
		path: "/registrationsuc",
		element: <Registrationsuc />
	}
]

export default routes
