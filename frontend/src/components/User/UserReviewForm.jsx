import React, { useState } from 'react';

const UserReviewForm = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');

    const handleButtonClick = () => {
        setPopupOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Same as in search need to do api search but I have no idea which one to use so Mateusz will need to guide me through the process
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
