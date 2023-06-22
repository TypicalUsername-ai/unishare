import { useDispatch, useSelector } from "react-redux"
import logout from "../functions/logout"
import { useEffect } from "react"
import { invalidate } from "../reducers/tokenSlice"
import { userLogOut } from "../reducers/userSlice"
import { useNavigate } from "react-router-dom"

const LogoutPage = () => {

    const token = useSelector((state) => state.token.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        logout(token).then(
            (res) => {
                console.log(res);
                dispatch(invalidate());
                dispatch(userLogOut());
                localStorage.removeItem('token');
                navigate("/home");
            },
            (err) => {
                navigate("/home");
            }
        )
    }, [])

    return (
        <div>
            Logging you out,
            you should be redirected shortly...
        </div>
    )
}

export default LogoutPage;