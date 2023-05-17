import UserLoginForm from "../components/Auth/UserLoginForm";
import "../components/form.css";
import RegistrationSuccess from "../components/Auth/RegistrationSuccess";

function LoginPage() {

    const user = {
        username: "",
        email: "",
        password: ""
    }

    const handleSave = (values) => {
        console.log({ values });
    };

    return (
        <div className="registrationContainer">
            <h1>UniShare Login</h1>
            <UserLoginForm onSave={handleSave} {...{ user }} />
        </div>
    );
}

export default LoginPage