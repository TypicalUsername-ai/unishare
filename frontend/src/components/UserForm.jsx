import React, { useState } from "react";
import validator from "validator";
import "./form.css";
// import "./index.css"; not necessary <?>

import * as Toast from '@radix-ui/react-toast';
import Field from "./field";
import { useNavigate } from "react-router-dom";

const UserForm = ({ onSave, user = {} }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '-', '/', '.', ',', '*', '-'];
    const [tosagreed, settosagreed] = useState(false);
    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    const [title, setTitle] = useState("Registration succesful");
    const [text, setText] = useState("Verification sent to provided email");

    const { username, email, password } = userData;
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
            console.log(errors.name);
        }

        if (!validator.isEmail(email)) {
            errors.email = "A valid email is required!";
        }

        if (!password) {
            errors.password = "A password is required!";
        }
        if (tosagreed == false) {
            errors.tos = "You need to agree to the terms of service";
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

        return errors;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length != 0) {
            setErrors(errors);
            return;
        }
        setErrors({});
        console.log(userData);
        const response = await fetch(
            "http://localhost/api/register",
            {
                method: 'POST',
                body: JSON.stringify({ username: userData.username, email: userData.email, password: userData.password }),
                headers: { 'Content-Type': 'application/json' }
            }
        );
        let resdata = await response.text();
        console.log(response, resdata);
        if (response.status !== 201) {
            setTitle("Registration error!");
            setText(`Reason : ${resdata}`);
        } else {
            setText(`Verification email sent to ${email}`);
        }
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setOpen(true);

        }, 150);
        if (response.status === 201) {
            onSave(userData);
            navigate("/registrationsuc")
        }
    }
    const handleCheckboxChange = () => {
        settosagreed(!tosagreed);
        console.log(tosagreed);
    }

    return (
        <div className="formContainer">

            <Field text="username" default="e.g. yourusername" name="username" onChange={handleChange} />
            <div className="errorInformation">{errors.name}</div>


            <Field text="e-mail" default="e.g. name@domain.com" name="email" onChange={handleChange} />
            <div className="errorInformation">{errors.email}</div>

            <Field text="password" type="password" default="password" name="password" onChange={handleChange} />
            <div className="errorInformation">{errors.password}</div>
            <div className="checkboxContainer">
                <input type="checkbox" id="terms" name="terms" value="accepted" onChange={handleCheckboxChange} />
                <label htmlFor="terms" className="checkboxLabel">I accept the <a href="/app/tos" target="_blank">terms and conditions</a>.</label>
            </div>
            <div className="errorInformation">{errors.tos}</div>

            <Toast.Provider swipeDirection="right">
                <button
                    className="formButton"
                    onClick={handleSave}>
                    Register
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

export default UserForm;
