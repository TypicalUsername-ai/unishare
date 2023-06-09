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
import FileOverviewPage from './pages/FileOverviewPage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import AdminPanel from './pages/AdminPanel'
import LogoutPage from './pages/LogoutPage'
import MyNotesPage from './pages/MyNotesPage'
import FileContentPage from './pages/FileContentPage'
import MyRatingsPage from './pages/MyRatingsPage'


const routes = [
	{
		path: "/home",
		element: <HomePage />
	},
	{
		path: "/profile/:username",
		element: <ProfilePage />
	},
	{
		path: "/account",
		element: <AccountPage />
	},
	{
		path: "/ratings",
		element: <MyRatingsPage />
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
	},
	{
		path: "/file/:fileid",
		element: <FileOverviewPage /> //This will need to be changed to be dynamic by file ids, similar to how users will need to be changed
	},
	{
		path: "/file/:fileid/content",
		element: <FileContentPage /> //This will need to be changed to be dynamic by file ids, similar to how users will need to be changed
	},
	{
		path: "/upload",
		element: <UploadPage />
	},
	{
		path: "/admin-panel",
		element: <AdminPanel />,
  },
  {
		path: "/logout",
		element: <LogoutPage/>
	},
	{
		path: "/notes",
		element: <MyNotesPage/>
	}

]

export default routes
