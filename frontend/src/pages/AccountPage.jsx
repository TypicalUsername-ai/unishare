import UserInformation from "../components/User/UserInformation"
import UserFilesContainer from "../components/User/UserFilesContainer"
import UserComments from "../components/User/UserComments"
import UserReviewForm from "../components/User/UserReviewForm"
import './account.css'
import { useSelector } from "react-redux"
import FileUpload from "../components/FileUpload"



function AccountPage() {

	const token = useSelector((state) => state.token.token);

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			<UserInformation />
			<FileUpload/>
			<UserFilesContainer />
			<UserComments />
			<UserReviewForm />

		</div>
	)
}

export default AccountPage
