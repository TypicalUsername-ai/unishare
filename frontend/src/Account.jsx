import UserInformations from "./components/UserInformations"
import UserFiles from "./components/UserFiles"
import UserComments from "./components/UserComments"

function Account() {
	return (
		<div style={{textAlign: "center"}} className="GlobalContainer">
			<UserInformations/>
			<UserFiles/>
			<UserComments/>
		</div>
	)
}

export default Account
