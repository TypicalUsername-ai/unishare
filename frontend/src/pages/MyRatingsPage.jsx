import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getMyReviews from '../functions/getMyReviews';
import Header from '../components/Header'
import { Navigate } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";
import deleteReview from '../functions/deleteReview'

const MyRatingsPage = () => {

    const user_id = useSelector((state) => state.user.id);
    const auth = useSelector((state) => state.token);

    const [data, setData] = useState({ files: [], users: []});

    useEffect(() => {
        getMyReviews(auth.token).then(
            (data) => setData(data)
        )
    }, [user_id])

    const handleDelete = (reviewed_id, type) => {
        console.log({reviewed_id, type, user_id})
        deleteReview(reviewed_id, type, user_id, auth.token).then(
            (ok) => alert("delete succesful"),
            (err) => alert("error deleting review " + err)
        )
    }

    return (
        <div>
            {!auth.authorized ? <Navigate to="/login?r=/ratings"/> : null}
            <Header/>
            <h4>Files:</h4>
            {data.files.map(
                (entry) => 
                    <div>
                        <h2> File : {entry.file_id}</h2>
                        <ReviewCard
                        picture={null}
                        name={entry.reviewer_id}
                        rating={entry.review}
                        text={entry.comment}
                        />
                        <button onClick={() => handleDelete(entry.reviewed_id, "files")}> delete review </button>
                    </div>
            )}
            <h4>Users:</h4>
            {data.users.map(
                (entry) => 
                <div>
                        <h2> User : {entry.reviewed_id}</h2>
                        <ReviewCard
                        picture={null}
                        name={entry.reviewer_id}
                        rating={entry.review}
                        text={entry.comment}
                        />
                        <button onClick={() => handleDelete(entry.reviewed_id, "users")}> delete review </button>
                    </div>
            )}
        </div>
    )
}

export default MyRatingsPage;