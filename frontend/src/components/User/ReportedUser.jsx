import deleteUser from "../../functions/deleteUser";
import { useNavigate } from 'react-router-dom';
import BanButton from "../admin/banButton.jsx";


const ReportedUser = (props) =>{

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/user/${id}`);
    };

    //Send email with information about actions taken against the user 

    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "200px" }}>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{props.name}</h3>
                <h3 style={{ marginBottom: "8px" }}>{props.report}</h3>
                <section style={{display:"flex", flexDirection:"row"}}>
                <label>Tag:</label>
                <label>{props.tag}</label>
                </section>
                <button onClick={handleClick} className='seeMore'>Details</button>
               
                <BanButton
                id={props.id}
                token={props.token}
                ></BanButton>
            </section>
        </div>
    );
}

export default ReportedUser