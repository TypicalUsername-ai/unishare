import React, { useState } from "react";
import validator from "validator";
import "./form.css";
// import "./index.css"; not necessary <?>

import * as Toast from '@radix-ui/react-toast';
import Field from "./field";
import { useNavigate } from "react-router-dom";

const UserPasswordReset = ({ onSave, user = {} }) => {
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});

    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);
    const [title, setTitle] = useState("Reset succesful");
    const [text, setText] = useState("Verification sent to provided email");


    const { username, email, password } = userData;

    const validateData = () => {
        let errors = {};
        if (!validator.isEmail(email)) {
            errors.email = "A valid email is required!";
        }
        return errors;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };


    const passwordReminder = async () => {
        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        setErrors({});
        let response = await fetch(
            "http://localhost/api/passwordreset",
            {
                method: 'POST',
                body: JSON.stringify({ email: userData.email }),
                headers: { 'Content-Type': 'application/json' }
            }
        )
        let resdata = await response.text();
        console.log(response, resdata);
        if (response.status !== 201) {
            setTitle("Reminder error!");
            setText(`Reason: `);
        } else {
            setText(`Password reset instructions sent to your e-mail address`);
        }
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setOpen(true);

        }, 150);
        if (response.status === 201) {
            window.setTimeout(() => {
                navigate("/passwordchange");
            }, 2000);
        }
    }

    return (
        <div className="formContainer">

            <Field text="e-mail" default="e.g. name@domain.com" name="email" onChange={handleChange} />
            <div className="errorInformation">{errors.email}</div>

            <Toast.Provider swipeDirection="right">
                <button
                    className="formButton"
                    onClick={passwordReminder}>
                    Reset Password
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

export default UserPasswordReset;
