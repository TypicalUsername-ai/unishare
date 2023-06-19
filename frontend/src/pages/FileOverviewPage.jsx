import { useParams } from "react-router-dom";
import FilePage from "../components/FilePage"
import Header from "../components/Header";
import './account.css'
import { useSelector } from "react-redux"



function FileOverview() {

	const {username, fileid} = useParams();
	const token = useSelector((state) => state.token.token);

	return (
		<div style={{ textAlign: "center" }} className="GlobalContainer">
			<div> owner : {username} file id : {fileid}</div>
			<Header/>
			<FilePage />
		</div>
	)
}

export default FileOverview
