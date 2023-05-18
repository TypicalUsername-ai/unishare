import HomePage from './pages/HomePage'
import AccountPage from './pages/AccountPage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import LoginConfirmPage from './pages/LoginConfirmPage'
import RegistrationConfirmPage from './pages/RegistrationConfirmPage'
import TosPage from './pages/TosPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import SetPasswordPage from './pages/SetPasswordPage'
import ExplorePage from './pages/ExplorePage'




const routes = [
	{
		path: "/home",
		element: <HomePage/>
	},
	{
		path: "/account",
		element: <AccountPage />
	},
	{
		path: "/register",
		element: <RegistrationPage />
	},
	{
		path: "/login",
		element: <LoginPage />
	},
	{
		path: "/loggedin",
		element: <LoginConfirmPage />
	},
	{
		path: "/registrationsuc",
		element: <RegistrationConfirmPage />
	},
	{
		path: "/tos",
		element: <TosPage />
	},
	{
		path: "/passwordreset",
		element: <ForgotPasswordPage />
	},
	{
		path: "/passwordchange",
		element: <SetPasswordPage />
	},
	{
	path: "/explore",
		element: <ExplorePage />
	}
]

export default routes
