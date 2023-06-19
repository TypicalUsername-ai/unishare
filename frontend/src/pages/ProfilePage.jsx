import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getProfile from "../functions/getProfile";
import getUserFiles from "../functions/getUserFiles";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const ProfilePage = () => {
    const { username } = useParams();
    const token = useSelector((state) => state.token.token);
    const [userData, setUserData] = useState({});
    const [userFiles, setUserFiles] = useState([]);
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
            {userFiles.map(
                (file) => <div>{JSON.stringify(file)}</div>
            )}
        </div>
    )
}

export default ProfilePage;