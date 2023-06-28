import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BanButton from "../admin/banButton.jsx";
import { useSelector } from 'react-redux'
import getFile from '../../functions/getFile.js'
import getProfile from '../../functions/getProfile.js'
import DeleteUserButton from '../User/DeleteUserButton.jsx';
import RejectReport from '../User/RejectReport.jsx';

const ReportedFile = ({ fileid, reporter_id, reason, report_id}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/file/${fileid}`);
    };

    const data = { fileid, reporter_id, reason, report_id};
    const [file, setFile] = useState({
        title: "loading..",
        primary_tag : "",
        secondary_tag : "",

    });
    const [fileAuthor, setFileAuthor] = useState("loading...");
    const [reporter, setReporter] = useState("loading...");

    const token  = useSelector((state) => state.token.token)

    useEffect(() => {
        getFile(fileid, token).then(
            (data) => {
                setFile(data.file)
                getProfile(data.file.creator, token).then(
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
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{file.title}</h3>
                <h4>author : {fileAuthor}</h4>
                <h4>reported by : {reporter}</h4>
                <section style={{display:"flex", flexDirection:"row"}}>
                <h3>Tag:</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{file.primary_tag}</p>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{file.secondary_tag}</p>
                </section>
                <h3 style={{ marginBottom: "8px" }}>{reason}</h3>
                <button onClick={handleClick} className='seeMore'>Details</button>
                <DeleteUserButton
                     id = {fileid}
                     token = {token}
                />
                <RejectReport
                    id = {fileid}
                    token = {token}
                />
                
            </section>
        </div>
    );
}

export default ReportedFile