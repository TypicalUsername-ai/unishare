import { useNavigate } from "react-router-dom"
import Header from "../components/Header"

function HomePage() {

	const navigate = useNavigate();

	return (
		<div>
			<Header/>
			<div className="HomeScreen">
			<p>Welcome to unishare, nice to have you here</p>
			<button onClick={() => navigate("/explore")}> Browse users </button>
			<button> Browse files </button>
			</div>
		</div>
	)
}

export default HomePage
