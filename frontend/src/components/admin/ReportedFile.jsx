import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BanButton from "../admin/banButton.jsx";
import { useSelector } from 'react-redux'
import getFile from '../../functions/getFile.js'
import getProfile from '../../functions/getProfile.js'

const ReportedFile = ({ fileid, reporter_id, reason, report_id}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/file/${fileid}`);
    };

    const [file, setFile] = useState(null);
    const [fileAuthor, setFileAuthor] = useState(null);
    const [reporter, setReporter] = useState(null);

    const token  = useSelector((state) => state.token.token)

    useEffect(() => {
        getFile(fileid, token).then(
            (data) => {
                setFile(data)
                getProfile(data.creator, token).then(
                    (user) => setFileAuthor(user.username)
                )
            }
        );
        getProfile(reporter_id, token).then(
            (data) => setReporter(data.username)
        )
    }, [])

    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "300px" }} >
            {file & fileAuthor & reporter ? <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{file.title}</h3>
                <h4>author : {fileAuthor}</h4>
                <section style={{display:"flex", flexDirection:"row"}}>
                <h3>Tag:</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{file.primary_tag}</p>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{file.secondary_tag}</p>
                </section>
                <h3 style={{ marginBottom: "8px" }}>{reason}</h3>
                <button onClick={handleClick} className='seeMore'>Details</button>
                <BanButton
                id={report_id}
                token={token}
                ></BanButton>
            </section>
            :
            <></>
    }
        </div>
    );
}

export default ReportedFile