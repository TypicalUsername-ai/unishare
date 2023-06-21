import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import getProfile from "../functions/getProfile";
import getUserFiles from "../functions/getUserFiles";
import getUserReviews from '../functions/getUserReviews';
import ReviewCard from '../components/ReviewCard'
import Header from "../components/Header";
import File from '../components/FileCard';

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
            {JSON.stringify(userData)}
            <button onClick={handleRatingAction}> Rate user </button>
            {userReviews.map(
                (review) => <ReviewCard
                    picture={null}
                    name={review.reviewer_id}
                    text={review.comment}
                    rating={review.review}
                />
            )}
            {userFiles.map(
                (file) => <File 
                    username={file.creator} 
                    fileid={file.id}
                    picture={null}
                    title={file.name}
                    price={file.price}
                    rating={file.rating}
                    primaryTag={file.primaryTag}
                    secondaryTag={file.secondaryTag}
                    editStamp={file.last_edit}
                    available={file.available}
                />
            )}
        </div>
    )
}

export default ProfilePage;