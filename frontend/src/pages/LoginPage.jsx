import UserLoginForm from "../components/Auth/UserLoginForm";
import "../components/form.css";
import RegistrationSuccess from "../components/Auth/RegistrationSuccess";
import Header from "../components/Header";
import checkToken from "../functions/checkToken";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../reducers/tokenSlice";
import { setUserId } from "../reducers/userSlice";

function LoginPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { r } = useParams();

    const user = {
        username: "",
        email: "",
        password: ""
    }

    const handleSave = (values) => {
        console.log({ values });
    };

    const storageToken = localStorage.getItem('token');

    checkToken(storageToken).then(
        (ok) => {
            dispatch(setToken(storageToken));
            dispatch(setUserId(ok.user_id));
            navigate(r ? "/" + r : "/account");
        },
        (err) => {localStorage.removeItem('token')}
    )

    return (
        <div className="registrationContainer">
            <Header/>
            <h1>UniShare Login</h1>
            <UserLoginForm onSave={handleSave} {...{ user }} />
        </div>
    );
}

export default LoginPage