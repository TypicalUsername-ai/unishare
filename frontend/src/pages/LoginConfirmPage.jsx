import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function LoginConfirmPage() {
    const auth = useSelector((state) => state.token);
    return (
        <div className="HomeScreen">
            Logged in successfully, await redirection...
            {auth.authorized && <Navigate to="/account"/>}
		</div>
    )
}

export default LoginConfirmPage
