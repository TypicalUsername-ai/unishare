import UserReviewForm from "./User/UserReviewForm"
import FileReviewsBox from "./FileReviewsBox";

export default function FilePage() {

    return (
        <div className="GlobalContainer">
            <h2>FILE</h2>
            HERE WILL BE DISPLAYED THE CONTENTS OF THE FILE 
            <FileReviewsBox />
            <FileReviewForm />

        </div>
    );
}