import UserRegistrationForm from "../components/Auth/UserRegistrationForm";
import "../components/form.css";
import RegistrationSuccess from "../components/Auth/RegistrationSuccess";
import Header from "../components/Header";

function RegistrationPage () {

    const user = {
        username: "",
        email: "",
        password: ""
    }

    const handleSave = (values) => {
        console.log({values});
    };    

    return (
        <div className="registrationContainer">
            <Header/>
            <h1>UniShare Registration</h1>
            <UserRegistrationForm onSave={handleSave} {...{ user }}/>
        </div>
    );
}

export default RegistrationPage
