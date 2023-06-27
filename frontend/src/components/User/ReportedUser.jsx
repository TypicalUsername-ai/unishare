import deleteUser from "../../functions/deleteUser";
import { useNavigate } from 'react-router-dom';
import BanButton from "../admin/banButton.jsx";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import getProfile from '../../functions/getProfile'


const ReportedUser = ({ id, reporter_id, tag }) =>{

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/user/${id}`);
    };

    const token = useSelector((state) => state.token.token);
    const [name, setName] = useState("");

    useEffect(() => {
        getProfile(id, token).then(
            (data) => setName(data.username)
        )
    }, [])

    //Send email with information about actions taken against the user 

    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "300px" }}>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{name}</h3>
                <h3 style={{ marginBottom: "8px" }}>{reporter_id}</h3>
                <section style={{display:"flex", flexDirection:"row"}}>
                <h3>Tag:</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}>{tag}</p>
                </section>
                <button onClick={handleClick} className='seeMore'>Details</button>
               
                <BanButton
                id={id}
                token={token}
                ></BanButton>
            </section>
        </div>
    );
}

export default ReportedUser