import UserPasswordReset from "../components/Auth/UserPasswordResetForm";
import "../components/form.css";

function ForgotPasswordPage() {
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

export default ForgotPasswordPage
