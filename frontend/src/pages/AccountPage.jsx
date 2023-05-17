import UserInformations from "./components/UserInformations"
import UserFiles from "./components/UserFiles"
import UserComments from "./components/UserComments"
import UserReviewForm from "./components/UserAddReview"
import './account.css'



function AccountPage() {

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			<UserInformations />
			<UserFiles />
			<UserComments />
			<AddReview />

		</div>
	)
}

export default AccountPage
