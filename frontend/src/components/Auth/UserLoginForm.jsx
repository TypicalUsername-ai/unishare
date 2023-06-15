import React, { useState } from "react";
import validator from "validator";
import "../form.css";

import * as Toast from '@radix-ui/react-toast';
import Field from "../field";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../../reducers/tokenSlice';
import { setUserId } from '../../reducers/userSlice'

const UserLoginForm = ({ onSave, user = {} }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [params, setParams] = useSearchParams();
    const { username, email, password } = userData;

    const token = useSelector((state) => state.token);
    const user_data = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const validateData = () => {
        let errors = {};
        if (!username) {
            errors.name = "Name is required!";
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
        let response = await fetch(
            "http://localhost/api/login",
            {
                method: 'POST',
                headers: { 'Authorization': `Basic ${btoa(username + ":" + password)}` }
            }
        )
        if (response.ok) {

            let data = await response.json();
            let access_token = data.access_token;
            let user_id = data.user;
            dispatch(setToken(access_token));
            dispatch(setUserId(user_id));
            let redirect = params.get("r");
            navigate(redirect ? "/" + redirect : "/" + username + "/profile");
        } else {
            let errors = {}
            errors.password = "invalid password";
            errors.name = "invalid name";
            setErrors(errors);
            return;
        }
    }
    const passwordReminder = async () => {
        navigate("/passwordreset");
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
                    onClick={passwordReminder}>
                    Forgot Password
                </button>
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>

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

export default UserLoginForm;
