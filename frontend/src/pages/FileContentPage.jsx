import Header from "../components/Header"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getFileContent from "../functions/getFileContent";
import { useEffect, useState } from "react";

const FileContentPage = () => {

    const { fileid } = useParams();
    const auth = useSelector((state) => state.token);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    if (!auth.authorized) {
        navigate(`/login?r=/file/${fileid}/content`);
    }

    useEffect(() => {
        getFileContent(fileid, auth.token).then(
            (data) => setContent(data.content),
            (err) => {
                alert("Error: "+err);
            }
        )
    }, [fileid, auth])
    

    return (
        <div>
            <Header/>
            <p style={{whiteSpace : "pre-wrap"}}>
                {content}
            </p>
        </div>
    )
}

export default FileContentPage;