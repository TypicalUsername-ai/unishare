import UserInformation from "../components/User/UserInformation"
import UserFilesContainer from "../components/User/UserFilesContainer"
import UserComments from "../components/User/UserComments"
import UserReviewForm from "../components/User/UserReviewForm"
import './account.css'



function AccountPage() {

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			<UserInformation />
			<UserFilesContainer />
			<UserComments />
			<AddReview />

		</div>
	)
}

export default AccountPage
