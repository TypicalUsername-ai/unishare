import React, { useState } from "react";
import validator from "validator";
import "./form.css";
// import "./index.css"; not necessary <?>

import * as Toast from '@radix-ui/react-toast';
import Field from "./field";

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
     
    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length){
            setErrors(errors);
            return;
        }
        setErrors({});
        console.log(userData);
	const response = await fetch(
		"http://localhost/api/register",
		{
			method: "POST",
			body: JSON.stringify({username: userData.username, email: userData.email, password: userData.password})
		}
	)
	conosle.log(response)
        setOpen(false);
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
        setOpen(true);
        }, 100);
        onSave(userData);
    }

    return(
        <div className="formContainer">
            
		<Field text="username" default="e.g. yourusername" name="username" onChange={handleChange}/>
                <div className="errorInformation">{errors.name}</div>


	    	<Field text="e-mail" default="e.g. name@domain.com" name="email" onChange={handleChange}/>
                <div className="errorInformation">{errors.email}</div>

		<Field text="password" type="password" default="password" name="password" onChange={handleChange}/>
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
