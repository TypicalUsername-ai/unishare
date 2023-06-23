import React from 'react';
import { useNavigate } from 'react-router-dom';
import BanButton from "../admin/banButton.jsx";

const ReportedFile = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/file/${props.fileid}`);
    };
    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "200px" }} >
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{props.title}</h3>
                <h4>author : {props.username}</h4>
                <label>Tag:</label>
                <label>{props.tag}</label>
                <h3 style={{ marginBottom: "8px" }}>{props.report}</h3>
                <button onClick={handleClick} className='seeMore'>Details</button>
                <BanButton
                id={props.id}
                token={props.token}
                ></BanButton>
            </section>

        </div>
    );
}

export default ReportedFile