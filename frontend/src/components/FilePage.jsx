import FileReviewsBox from "./FileReviewsBox";
import FileReviewForm from './FileReviewForm';
import FilePurchaseBox from './FilePurchaseBox'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getFile from '../functions/getFile';

export default function FilePage() {

    const { fileid } = useParams();
    const token = useSelector((state) => state.token.token);
    let [file, setFile] = useState({});

    useEffect(() => {
        getFile(fileid, token).then(
            (data) => setFile(data)
        )
    }, [])

    return (
        <div className="GlobalContainer">
            <h2>FILE</h2>
            <p>{JSON.stringify(file)}</p>
            HERE WILL BE DISPLAYED THE CONTENTS OF THE FILE 
            <FileReviewsBox />
            <FileReviewForm />
            <FilePurchaseBox />

        </div>
    );
}