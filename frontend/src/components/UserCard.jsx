import { useNavigate } from "react-router-dom";

const UserCard = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div> 
            <div>{data.username} public files: {data.pub_files}</div>
            <div/>
            <button onClick={() => navigate("/"+data.username+"/profile")} > profile </button>
        </div>
    )
};

export default UserCard;