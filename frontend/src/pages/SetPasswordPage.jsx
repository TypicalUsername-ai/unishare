import UserPasswordSet from "../components/UserPasswordSet";
import "./components/form.css";

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
            <h1>Password Reminder</h1>
            <UserPasswordSet onSave={handleSave} {...{ user }} />
        </div>
    );
}

export default SetPasswordPage
