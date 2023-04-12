import UserForm from "./userForm";
import "./form.css";

export default function Registration () {

    const handleSave = (values) => {
        console.log({values});
    };    

    return (
        <div className="registrationContainer">
            <h1>UniShare Registration</h1>
            <UserForm onSave={handleSave}/>
        </div>
    );
}