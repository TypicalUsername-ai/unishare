import { useState } from "react";
import ExploreSearch from "../components/ExploreSearch";
import Header from "../components/Header";
import "../components/form.css";

function ExplorePage() {
    const user = {
        username: "",
        email: "",
        password: ""
    }

    const handleSave = (values) => {
        console.log({ values });
    };

    const [type, setType] = useState("users");

    const changeType = () => {
        if (type === "users") {
            setType("files");
        } else if (type === "files") {
            setType("users");
        } else {
            setType("users");
        }
    }

    return (
        <div className="registrationContainer">
            <Header/>
            <h1>Explore</h1>
            <div>
                <label>Searching for: </label>
                <button onClick={changeType}> {type} </button>
            </div>
            <ExploreSearch onSave={handleSave} searchType={type} {...{ user }} />
        </div>
    );
}

export default ExplorePage
