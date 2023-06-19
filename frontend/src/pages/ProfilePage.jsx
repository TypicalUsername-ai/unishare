import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getProfile from "../functions/getProfile";
import getUserFiles from "../functions/getUserFiles";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const ProfilePage = () => {
    const { username } = useParams();
    const token = useSelector((state) => state.token.token);
    const authorized = useSelector((state) => state.token.authorized);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [userFiles, setUserFiles] = useState([]);


    const handleRatingAction = () => {
        if (authorized) {
            navigate(`/file/${username}/rate`);
        } else {
            navigate(`/login?r=/file/${username}/rate`);
        }
    }

    useEffect(() => {
        getProfile(username, token).then(
            (data) => setUserData(data)
        );
        getUserFiles(username, token).then(
            (files) => setUserFiles(files)
        );
    }, [])

    return (
        <div>
            <Header/>
            {JSON.stringify(userData)}
            <button onClick={handleRatingAction}> Rate user </button>
            {userFiles.map(
                (file) => <div>{JSON.stringify(file)}</div>
            )}
        </div>
    )
}

export default ProfilePage;