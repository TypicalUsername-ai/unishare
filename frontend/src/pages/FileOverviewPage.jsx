import FilePage from "../components/FilePage"
import Header from "../components/Header";
import './account.css'
import { useSelector } from "react-redux"



function FileOverview() {

	const token = useSelector((state) => state.token.token);

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			<Header/>
			<FilePage />
		</div>
	)
}

export default FileOverview
