import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const UserReviewForm = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const { userId } = useParams();

    const handleButtonClick = () => {
        setPopupOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{"user_id":"' + userId + '","review":"' + reviewText + "reviewerId" + userId + '"}'
        };

        let response = await fetch('http://localhost/api/add_review', options)

        console.log('Review:', reviewText);
        setReviewText('');
        setPopupOpen(false);
    };

    const handleInputChange = (event) => {
        setReviewText(event.target.value);
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
                        <button type="submit" className="popup-submit-button">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserReviewForm;
