import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import postFileReview from '../functions/postFileReview';


const FileReviewForm = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { fileid } = useParams();
    const authorized = useSelector((state) => state.token.authorized);
    const authToken = useSelector((state) => state.token.token);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (!authorized) {
            navigate(`/login?r=/file/${fileid}`);
        }
        setPopupOpen(true);
    };


    const handleSubmit = async (event) => {
        console.log(authToken);
        if (rating === 0) {
            alert("You must choose rating before submiting your review");
            return;
        }


        /// api to give and recive tokens, dunno what params are here so...
        event.preventDefault();

        postFileReview(rating, reviewText, fileid, authToken).then(
            (ok_res) => {
                alert("Review submitted succesfully");
                setReviewText('');
                setRating(0);
                setPopupOpen(false);
            },
            (err) => {
                alert("Error submitting review")
            }
        )

        // let response = await fetch('http://localhost/api/add_review', options)

    };

    const handleInputChange = (event) => {
        setReviewText(event.target.value);
    };
    const handleRatingChange = (value) => {
        setRating(value);
    };
    return (
        <div>
            <button onClick={handleButtonClick}>Add Review</button>
            {isPopupOpen && (
                <div className="popup-container">
                    <button onClick={() => setPopupOpen(false)}>close</button>
                    <form onSubmit={handleSubmit} className="popup-form">
                        <textarea
                            value={reviewText}
                            onChange={handleInputChange}
                            placeholder="Enter your review"
                            className="popup-textarea"
                        />
                        <div className="rating-container">
                            {[...Array(5)].map((_, index) => (
                                <span
                                    key={index}
                                    className={`star ${index < rating ? 'selected' : ''}`}
                                    onClick={() => handleRatingChange(index + 1)}
                                />
                            ))}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default FileReviewForm;