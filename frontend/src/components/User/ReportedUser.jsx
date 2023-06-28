import { useNavigate } from 'react-router-dom';
import DeleteUserButton from "./DeleteUserButton";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import getProfile from '../../functions/getProfile'
import RejectReport from "./RejectReport";


const ReportedUser = ({ id, reporter_id, reason }) =>{

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/user/${id}`);
    };

    const token = useSelector((state) => state.token.token);
    const [name, setName] = useState("");
    const [reporter, setReporter] = useState("");

    useEffect(() => {
        getProfile(id, token).then(
            (data) => setName(data.username)
        )
        getProfile(reporter_id, token).then(
            (data) => setReporter(data.username)
        )
    }, [])

    //Send email with information about actions taken against the user 

    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "300px" }}>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{name}</h3>
                <h3 style={{ marginBottom: "8px" }}>{reporter}</h3>
                <section style={{display:"flex", flexDirection:"row"}}>
                <h3>Reason:</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{reason}</p>
                </section>
                <button onClick={handleClick} className='seeMore'>Details</button>
               
                <DeleteUserButton
                     id = {id}
                     token = {token}
                />
                <RejectReport
                    id = {id}
                    token = {token}
                />
            </section>
        </div>
    );
}

export default ReportedUser