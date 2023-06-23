import { useEffect, useState } from "react";
import getFileReviews from "../functions/getFileReviews";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReviewCard from './ReviewCard';

const FileReviewsBox = () => {

    const { fileid } = useParams();
    const token = useSelector((state) => state.token.token);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getFileReviews(fileid, token).then(
            (data) => setReviews(data)
        )
    }, [])

    return (
        <div>
            Reviews:
            {reviews.map(
                (review) => <ReviewCard
                    picture={null}
                    name={review.reviewer_id}
                    text={review.comment}
                    rating={review.review}
                />
            )}
        </div>
    )

}

export default FileReviewsBox;