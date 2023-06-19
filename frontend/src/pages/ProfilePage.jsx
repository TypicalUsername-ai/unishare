import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProfile from "../functions/getProfile";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const ProfilePage = () => {
    const { username } = useParams();
    const token = useSelector((state) => state.token.token);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        getProfile(username, token).then(
            (data) => setUserData(data)
        )
    }, [])

    return (
        <div>
            <Header/>
            {JSON.stringify(userData)}
        </div>
    )
}

export default ProfilePage;