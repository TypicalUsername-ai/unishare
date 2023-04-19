import React, { useState } from "react";
import validator from "validator";
import "./form.css";
// import "./index.css"; not necessary <?>

import * as Toast from '@radix-ui/react-toast';
import Field from "./field";

const UserForm = ({ onSave, user = {} }) => {
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});

    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    const { username, email, password } = userData;

    const validateData = () => {
        let errors = {};
        if (!username) {
            errors.name = "Name is required!";
            console.log(errors.name);
        }

        if (!password) {
            errors.password = "A password is required!";
        }

        return errors;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        setErrors({});
        console.log(userData);
        let response = await fetch(
            "http://localhost/api/login",
            {
                method: 'POST',
                body: JSON.stringify({ username: userData.username, password: userData.password }),
                headers: { 'Content-Type': 'application/json' }
            }
        )
        console.log(response)
        if (response.ok) {
            window.location.href = "/app/loggedin";
        } else {
            let errors = {}
            errors.password = "invalid password";
            errors.name = "invalid name";
            setErrors(errors);
            return;
        }
    }

    return (
        <div className="formContainer">

            <Field text="username" default="e.g. yourusername" name="username" onChange={handleChange} />
            <div className="errorInformation">{errors.name}</div>

            <Field text="password" type="password" default="password" name="password" onChange={handleChange} />
            <div className="errorInformation">{errors.password}</div>


            <Toast.Provider swipeDirection="right">
                <button
                    className="formButton"
                    onClick={handleSave}>
                    Login
                        </button>
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>

        </div>
    );
}

export default UserForm;
