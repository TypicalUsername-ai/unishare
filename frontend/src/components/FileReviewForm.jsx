import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const FileReviewForm = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const { fileid } = useParams();
    const authorized = useSelector((state) => state.token.authorized);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if(!authorized) {
            navigate(`/login?r=/file/${fileid}`);
        }
        setPopupOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const options = {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: '{"user_id":"' + userId + '","review":"' + reviewText + "reviewerId" + userId + '"}'
        // };

        // let response = await fetch('http://localhost/api/add_review', options)

        console.log('Review:', reviewText); // reviewtext is holding the text for the review
        console.log('Rating:', rating); // rating is just star rating 0-5
        setReviewText('');
        setRating(0);
        setPopupOpen(false);
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