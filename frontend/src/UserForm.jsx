import React, { useState } from "react";
import validator from "validator";
import "./form.css";
import "./index.css";

import * as Toast from '@radix-ui/react-toast';

 const UserForm = ({onSave, user={}}) => {
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});

    const [open, setOpen] = React.useState(false);
    const timerRef = React.useRef(0);

    const {username, email, password} = userData;

    const validateData = () => {
        let errors = {};
        if (!username){
            errors.name = "Name is required!";
            console.log(errors.name);
        }

        if (!validator.isEmail(email)){
            errors.email = "A valid email is required!";
        }

        if (!password) {
            errors.password = "A password is required!";
        }

        return errors;
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevData) => ({...prevData, [name]: value }));
    };
     
    const handleSave = () => {
        const errors = validateData();
        if (Object.keys(errors).length){
            setErrors(errors);
            return;
        }
        setErrors({});
        console.log(userData);
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
        setOpen(true);
        }, 100);
        onSave(userData);
    }

    return(
        <div className="formContainer">
            
                <p className="formLabel">Username</p>
                <input className="formInput" name='username' value={username} onChange={handleChange}/>
                <div className="errorInformation">{errors.name}</div>


                <p className="formLabel">Email</p>
                <input className="formInput" name='email' value={email} onChange={handleChange}/>
                <div className="errorInformation">{errors.email}</div>

                <p className="formLabel">Password</p>
                <input className="formInput" name='password' value={password} onChange={handleChange}/>
                <div className="errorInformation">{errors.password}</div>
            
                    <Toast.Provider swipeDirection="right">
                        <button
                            className="formButton"
                            onClick={handleSave}>
                            Register
                        </button>

                        <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                            <Toast.Title className="ToastTitle">Registration Successful</Toast.Title>
                            <Toast.Description asChild><div className="FormInformation">Verification code sent to {email}</div>
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