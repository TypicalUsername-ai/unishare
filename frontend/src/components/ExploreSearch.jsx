import React, { useEffect, useState } from "react";
import "./form.css";
import * as Toast from '@radix-ui/react-toast';
import Field from "./field";
import { useNavigate } from "react-router-dom";
import UserSearchResults from "./UserSearchResults";
import FileSearchResults from "./FileSearchResults";

const ExploreSearch = ({ onSave, user = {}, searchType }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(user);
    const [errors, setErrors] = useState({});
    const [results, setResults] = useState([]);
    const { search, tag } = userData;
    const [showCategory, setShowCategory] = useState(false);

    const validateData = () => {
        let errors = {};
        if (!search && !tag) {
            errors.search = "You need to search for something!";
        }
        return errors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        const errors = validateData();
        if (Object.keys(errors).length !== 0) {
            setErrors(errors);
            return;
        }
        setErrors({});
        console.log(tag); //category contains the insides of the category 
        const response = tag !== null ?
            await fetch(`http://localhost/api/${searchType}/search?name=${search}&tag=${tag}`) :
            await fetch(`http://localhost/api/${searchType}/search?name=${search}`);


        if (response.ok) {
            setResults(await response.json());
        } else {
            let error = {};
            error.search = "Provided query returned no matches";
            setErrors(error);
            return;
        }
    };

    useEffect(() => {
        setResults([]);
        setShowCategory(searchType === "files");
        setUserData((prevData) => ({ ...prevData, tag: null }));
    }, [searchType]);

    return (
        <div className="formContainer">
            <Field text="search" default="search" name="search" onChange={handleChange} />
            <div className="errorInformation">{errors.search}</div>

            {showCategory && (
                <>
                    <Field
                        text="tag"
                        default="tag"
                        name="tag"
                        onChange={handleChange}
                    />
                    <div className="errorInformation">{errors.category}</div>
                </>
            )}

            <Toast.Provider swipeDirection="right">
                <button className="formButton" onClick={handleSave}>
                    Search
                </button>
                <p>
                    Showing {results.length} results for {searchType}
                </p>
                {searchType === "users" ? (
                    <UserSearchResults data={results} />
                ) : (
                    <FileSearchResults data={results} />
                )}
                <Toast.Viewport className="ToastViewport" />
            </Toast.Provider>
        </div>
    );
};

export default ExploreSearch;
