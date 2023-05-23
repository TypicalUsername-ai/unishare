import React, { useState } from "react";
import "./form.css";
import * as Toast from '@radix-ui/react-toast';
import Field from "./field";
import { useNavigate } from "react-router-dom";

const ExploreSearch = ({ onSave, user = {} }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});
    const { search } = userData;

    const validateData = () => {
        let errors = {};
        if (!search) {
            errors.search = "You need to search for something!";
            console.log(errors.name);
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

        const response = await fetch(
            `http://localhost/api/users/search?name=${search}`,
        );

        // let response = {
        //     ok: 123
        // };


        if (response.ok) {
            console.log(await response.json())
            navigate("/" + search + "/profile") //!!!!!!!!Here we redirect them to the user's profile that we searched for !!!! needs to be done also later to be changed, instead of  redirecting to exact user we should produce a list of users and files that fit the search word
        } else {
            let error = {};
            error.search = "Provided user does not exist"; //Will need to be later change, so far I'm implementing simple logic -> look for exact user, if dne then give error, later on we probably need some sort of algorithym to look for files and users at the same time and also that doesnt look at exact string imput but looks for similarities like search: Ernst powinno nadal wyszukac Ernesta lub jakies pliki o nazwie Ernest
            setErrors(error);
            return;
        }
    }


    return (
        <div className="formContainer">

            <Field text="search" default="search" name="search" onChange={handleChange} />
            <div className="errorInformation">{errors.search}</div>

            <Toast.Provider swipeDirection="right">
                <button
                    className="formButton"
                    onClick={handleSave}>
                    Search
                </button>
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>

        </div>
    );
}

export default ExploreSearch;
