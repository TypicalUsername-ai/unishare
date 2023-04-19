import UserForm from "./components/UserLogin";
import "./components/form.css";
import RegSuccess from "./components/RegSuccess";

export default function Registration() {

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
            <UserForm onSave={handleSave} {...{ user }} />
        </div>
    );
}
