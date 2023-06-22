import deleteUser from "../../functions/deleteUser";
import { useNavigate } from 'react-router-dom';
import BanButton from "../admin/banButton.jsx";


const ReportedUser = ({name, id, report, token }) =>{

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/user/${id}`);
    };

    //Send email with information about actions taken against the user 





    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px" }}>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{name}</h3>
                <h3 style={{ marginBottom: "8px" }}>{report}</h3>
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