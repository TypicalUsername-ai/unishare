import NewPasswordForm from "../components/Auth/NewPasswordForm";
import Header from "../components/Header";
import "../components/form.css";

function SetPasswordPage() {
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
            <Header/>
            <h1>Password Reminder</h1>
            <NewPasswordForm onSave={handleSave} {...{ user }} />
        </div>
    );
}

export default SetPasswordPage
