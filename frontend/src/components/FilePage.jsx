import FileReviewsBox from "./FileReviewsBox";
import FileReviewForm from './FileReviewForm';
import FilePurchaseBox from './FilePurchaseBox';
import FileInfoCard from "./FileInfoCard";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getFile from '../functions/getFile';

export default function FilePage() {

    const { fileid } = useParams();
    const token = useSelector((state) => state.token.token);
    let [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getFile(fileid, token).then(
            (data) => setFile(data),
            (err) => {
                alert(err);
                navigate("/home");
            }
        )
    }, [])

    return (
        <div className="GlobalContainer">
            {file ?
                <>
                    <FileInfoCard data={file.file} snippet={file.snippet} transaction={file.transaction}/>
                    <FileReviewsBox />
                    <FileReviewForm />
                    <FilePurchaseBox price={file.file.price} transaction={file.transaction}/>
                </>
            : 
                <p> loading... </p>
            }

        </div>
    );
}