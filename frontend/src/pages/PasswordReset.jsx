import UserPasswordReset from "../components/UserPasswordReset";
import "./components/form.css";

function PasswordReset() {
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
            <h1>Password Reminder</h1>
            <UserPasswordReset onSave={handleSave} {...{ user }} />
        </div>
    );
}

export default PasswordReset
