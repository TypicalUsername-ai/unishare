import { useEffect, useState } from "react";
import getFileReviews from "../functions/getFileReviews";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
            File reviews
            {JSON.stringify(reviews)}
        </div>
    )

}

export default FileReviewsBox;