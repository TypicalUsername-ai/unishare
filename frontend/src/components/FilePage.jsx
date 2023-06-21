import FileReviewsBox from "./FileReviewsBox";
import FileReviewForm from './FileReviewForm';
import FilePurchaseBox from './FilePurchaseBox'

export default function FilePage() {

    return (
        <div className="GlobalContainer">
            <h2>FILE</h2>
            HERE WILL BE DISPLAYED THE CONTENTS OF THE FILE 
            <FileReviewsBox />
            <FileReviewForm />
            <FilePurchaseBox />

        </div>
    );
}