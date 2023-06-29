import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getMyReviews from '../functions/getMyReviews';
import Header from '../components/Header'
import { Navigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

const MyRatingsPage = () => {

    const user_id = useSelector((state) => state.user.id);
    const auth = useSelector((state) => state.token);

    const [data, setData] = useState({ files: [], users: []});

    useEffect(() => {
        getMyReviews(auth.token).then(
            (data) => setData(data)
        )
    }, [user_id])

    return (
        <div>
            {!auth.authorized ? <Navigate to="/login?r=/ratings"/> : null}
            <Header/>
            <h3>Files:</h3>
            {data.files.map(
                (entry) => 
                    <div>
                        <ReviewCard
                        picture={null}
                        name={entry.reviewed_id}
                        rating={entry.review}
                        text={entry.comment}
                        />
                    </div>
            )}
            <h3>Users:</h3>
            {data.users.map(
                (entry) => 
                    <div>
                        <ReviewCard
                        picture={null}
                        name={entry.reviewed_id}
                        rating={entry.review}
                        text={entry.comment}
                        />
                    </div>
            )}
        </div>
    )
}

export default MyRatingsPage;