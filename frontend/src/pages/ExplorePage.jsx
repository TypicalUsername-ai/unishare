import ExploreSearch from "../components/ExploreSearch";
import "./components/form.css";

function ExplorePage() {
    const user = {
        username: "",
        email: "",
        password: ""
    }

    const handleSave = (values) => {
        console.log({ values });
    };

    return (
        <div className="registrationContainer">
            <h1>Explore</h1>
            <ExploreSearch onSave={handleSave} {...{ user }} />
        </div>
    );
}

export default ExplorePage
