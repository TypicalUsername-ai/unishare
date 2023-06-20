import { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard";
import { useNavigate } from "react-router-dom";
import getUserReviews from "../../functions/getUserReviews";
import { useSelector } from "react-redux";

export default function UserComments (props) {

    const navigate = useNavigate();
    let [reviews, setReviews] = useState([]);
    const id = props.id;
    const auth = useSelector((state) => state.token);

    useEffect(() => {
        id && getUserReviews(id, auth.token).then(
            (reviews) => {console.log(reviews); setReviews(reviews)},
            (err) => {console.warn("getUserReviews error", err); navigate("/error")}
        )
    }, [id, auth]);

    return (
        <div className="GlobalContainer">
            <h2>Reviews</h2>
            {reviews.map((review) => 
                <ReviewCard 
                    name={review.reviewer_id}
                    picture="https://static2.strzelce360.pl/data/articles/xl-ernest-khalimov-czy-istnieje-kto-to-wiek-wzrost-waga-wikipedia-1669905523-full.jpg"
                    text={review.comment}
                    rating={review.review}
                />
            )}
        </div>
    );
}