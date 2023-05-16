import UserInformations from "./components/UserInformations"
import UserFiles from "./components/UserFiles"
import UserComments from "./components/UserComments"
import AddReview from "./components/UserAddReview"
import './account.css'



function Account() {

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			<UserInformations />
			<UserFiles />
			<UserComments />
			<AddReview />

		</div>
	)
}

export default Account
