import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';


const UserReviewForm = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { params } = useParams();
    const authToken = useSelector((state) => state.token.token);
    const authorized = useSelector((state) => state.token.authorized);
    const authorizedd = useSelector((state) => state.token);



    const handleButtonClick = () => {
        setPopupOpen(true);
    };

    const handleSubmit = async (event) => {
        console.log(authorizedd);
        if (rating === 0) {
            alert("You must choose rating before submiting your review");
            return;
        } else if (!authorized) {
            alert("You must be logged in to add a review!");
            return;
        }


        /// api to give and recive tokens, dunno what params are here so...
        event.preventDefault();

        const response = await fetch(`http://localhost/api/users/${params}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                rating: rating,
                comment: reviewText
            })
        });

        if (response.ok) {
            console.log('Review added');
        } else {
            console.error('Error adding review' + response);
        }

        // let response = await fetch('http://localhost/api/add_review', options)

        setReviewText('');
        setRating(0);
        setPopupOpen(false);
        alert("Your review was submited!");
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

export default UserReviewForm;
