import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import getProfile from "../functions/getProfile";
import getUserFiles from "../functions/getUserFiles";
import getUserReviews from '../functions/getUserReviews';
import ReviewCard from '../components/ReviewCard'
import Header from "../components/Header";
import File from '../components/FileCard';
import UserInformation from "../components/User/UserInformation";
import UserFilesContainer from "../components/User/UserFilesContainer";
import UserComments from "../components/User/UserComments";
import UserReviewForm from "../components/User/UserReviewForm";

const ProfilePage = () => {
    const { username } = useParams();
    const token = useSelector((state) => state.token.token);
    const authorized = useSelector((state) => state.token.authorized);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [userReviews, setUserReviews] = useState([]);
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
        getUserReviews(username, token).then(
            (data) => setUserReviews(data)
        );
    }, [])

    return (
        <div>
            <Header/>
			<UserInformation id={username}/>
			<UserFilesContainer userid={username}/>
			<UserComments id={username}/>
			<UserReviewForm id={username}/>
        </div>
    )
}

export default ProfilePage;