import UserInformation from "../components/User/UserInformation"
import UserFilesContainer from "../components/User/UserFilesContainer"
import UserComments from "../components/User/UserComments"
import UserReviewForm from "../components/User/UserReviewForm"
import './account.css'
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from 'react-router-dom'
import NavMenu from "../components/NavMenu"
import Header from "../components/Header"



function AccountPage() {

	const token = useSelector((state) => state.token.token);
	const authorized = useSelector((state) => state.token.authorized);
	const id = useSelector((state) => state.user.id);
	const navigate = useNavigate();

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			{!authorized ? <Navigate to="/login?r=account"/> : null }
			<Header/>
			<UserInformation id={id}/>
			<UserFilesContainer userid={id}/>
			<UserComments id={id}/>
			<UserReviewForm id={id}/>

		</div>
	)
}

export default AccountPage
