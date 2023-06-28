import { useNavigate } from 'react-router-dom';
import DeleteUserButton from "./DeleteUserButton";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import rejectReport from '../../functions/rejectReport';
import acceptReport from '../../functions/acceptReport';
import getProfile from '../../functions/getProfile';


const ReportedUser = (props) =>{

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/user/${props.id}`);
    };

    const token = useSelector((state) => state.token.token);
    const [name, setName] = useState("");
    const [reporter, setReporter] = useState("");

    useEffect(() => {
        getProfile(props.id, token).then(
            (data) => setName(data.username)
        )
        getProfile(props.reporter_id, token).then(
            (data) => setReporter(data.username)
        )
        console.log("ID Reported User" + props.id)
        console.log("Token Reported User" + token)
    }, [])

    //Send email with information about actions taken against the user 

    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "300px" }}>
            <section style={{ textAlign: "left" }}>
                <h4>User ID</h4>
                <p style={{ marginBottom: "8px" }}>{props.name}</p>
                <h4>Reported ID</h4>
                <p style={{ marginBottom: "8px" }}>{props.reporter_id}</p>
                <section style={{display:"flex", flexDirection:"row"}}>
                <h3>Reason:</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{props.reason}</p>
                </section>
                <button onClick={handleClick} className='seeMore'>Details</button>
               
                <button onClick={acceptReport(props.id, token)} className='seeMore' >Accept</button>
                <button onClick={rejectReport(props.id, token)} className='seeMore' >Decline</button>
            </section>
        </div>
    );
}

export default ReportedUser