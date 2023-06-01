import UserInformation from "../components/User/UserInformation"
import UserFilesContainer from "../components/User/UserFilesContainer"
import UserComments from "../components/User/UserComments"
import UserReviewForm from "../components/User/UserReviewForm"
import './account.css'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import NavMenu from "../components/NavMenu"
import Header from "../components/Header"



function AccountPage() {

	const token = useSelector((state) => state.token.token);
	const authorized = useSelector((state) => state.token.authorized);
	const id = useSelector((state) => state.user.id);

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			{!authorized ? <Navigate to="/login"/> : null }
			<Header/>
			<UserInformation id={id}/>
			<UserFilesContainer />
			<UserComments id={id}/>
			<UserReviewForm />

		</div>
	)
}

export default AccountPage
