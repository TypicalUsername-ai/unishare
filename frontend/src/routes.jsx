import Home from './Home'
import Account from './Account'
import Registration from './Registration'
import Login from './Login'
import Loggedin from './Loggedin'
import Registrationsuc from './Registrationsuc'
import Tos from './Tos'
import PasswordReset from './PasswordReset'
import PasswordSet from './PasswordSet'
import Explore from './Explore'




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
	},
	{
		path: "/tos",
		element: <Tos />
	},
	{
		path: "/passwordreset",
		element: <PasswordReset />
	},
	{
		path: "/passwordchange",
		element: <PasswordSet />
	},
	{
		path: "/explore",
		element: <Explore />
	}
]

export default routes
