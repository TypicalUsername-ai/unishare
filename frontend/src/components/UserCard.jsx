import { useNavigate } from "react-router-dom";

const UserCard = ({ data }) => {
    const navigate = useNavigate();

    const imagelink = "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80";

    return (
        <div> 
            <img src={imagelink} style={{width : "40px" , height : "40px"}}/>
            <div>{data.username} public files: {data.pub_files}</div>
            <div/>
            <button onClick={() => navigate("/"+data.username+"/profile")} > profile </button>
        </div>
    )
};

export default UserCard;