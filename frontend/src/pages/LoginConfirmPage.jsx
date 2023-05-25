import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Header from "../components/Header";

function LoginConfirmPage() {
    const auth = useSelector((state) => state.token);
    return (
        <div>
            <Header/>
            <div className="HomeScreen">
                Logged in successfully, await redirection...
                {auth.authorized && <Navigate to="/account"/>}
            </div>
        </div>
    )
}

export default LoginConfirmPage
