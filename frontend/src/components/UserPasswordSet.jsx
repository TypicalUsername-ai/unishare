import React, { useState } from "react";
import validator from "validator";
import "./form.css";
// import "./index.css"; not necessary <?>

import * as Toast from '@radix-ui/react-toast';
import Field from "./field";

const UserPasswordSet = ({ onSave, user = {} }) => {
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '-', '/', '.', ',', '*', '-'];

    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);
    const [title, setTitle] = useState("Reset succesful");
    const [text, setText] = useState("You should be able to log in using your new password");

    const { username, code, password, password2 } = userData;
    const specialCharacter = (character) => {
        for (let i = 0; i < specialCharacters.length; i++) {
            if (character == specialCharacters[i]) return true
        }
        return false
    };
    const validateData = () => {
        let errors = {};
        if (!username) {
            errors.name = "Name is required!";
        }
        if (!password) {
            errors.password = "Password is required!";
        }
        if (!code) {
            errors.code = "Verification code from your e-mail is required!"
        }
        if (password) {
            if (password.length < 8) { errors.password = "Password is too short!"; }
            for (let i = 0; i < password.length; i++) {
                if (specialCharacter(password[i]) == true) { break };
                if (i + 1 == password.length) { errors.password = "Password needs to be more complex"; } // Dont ask me bro, it works ok?
            }
            if (/[A-Z]/.test(password) == false) {
                errors.password = "Password needs at least 1 upper case character";
            }

        }
        if (password !== password2) { errors.password = "Passwords need to be the same" }

        errors.password2 = errors.password;
        return errors;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };


    const passwordReminder = async () => {
        const errors = validateData();
        if (Object.keys(errors).length != 0) {
            setErrors(errors);
            return;
        }
        setErrors({});
        let response = await fetch(
            "http://localhost/api/passwordset",
            {
                method: 'POST',
                headers: { 'Authorization': `Basic ${btoa(password + ":" + code)}` }
            }
        )
        let resdata = await response.text();
        console.log(response, resdata);
        if (response.status !== 201) {
            setTitle("Reminder error!");
            setText(`Reason: ${resdata}`);
        } else {
            setText(`Password has been reset!`);
        }
        if (response.status === 201) {
            window.setTimeout(() => {
                window.location.href = "/app/login";
            }, 3000);
        }
    }

    return (
        <div className="formContainer">

            <Field text="new password" type="password" default="password" name="password" onChange={handleChange} />
            <div className="errorInformation">{errors.password}</div>
            <Field text="new password (repeated)" type="password2" default="password2" name="password2" onChange={handleChange} />
            <div className="errorInformation">{errors.password2}</div>
            <Field text="code" type="code" default="code" name="code" onChange={handleChange} />
            <div className="errorInformation">{errors.code}</div>

            <Toast.Provider swipeDirection="right">
                <button
                    className="formButton"
                    onClick={passwordReminder}>
                    Change Password
                        </button>
                <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                    <Toast.Title className="ToastTitle">{title}</Toast.Title>
                    <Toast.Description asChild><div className="FormInformation">{text}</div>
                    </Toast.Description>
                    <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
                        <button className="Button small green">Close</button>
                    </Toast.Action>
                </Toast.Root>
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>


        </div>
    );
}

export default UserPasswordSet;
