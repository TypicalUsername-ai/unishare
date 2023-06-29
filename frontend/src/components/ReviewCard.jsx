import * as Avatar from '@radix-ui/react-avatar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getProfile from '../functions/getProfile';
import { useSelector } from 'react-redux';

const ReviewCard = ({picture, name, text, rating}) => {

    const [user, setUser] = useState("loading...")
    const navigate = useNavigate();
    const token = useSelector((state) => state.token.token)

    useEffect(() => {
        getProfile(name, token).then(
            (data) => setUser(data.username)
        )
    }, name)

    return (
        <div style={{backgroundColor: "aliceblue", borderRadius: "50px", display: "inline-block", marginBottom: "20px"}}>
                <Avatar.Root className="AvatarRoot" style={{borderRadius: "20px"}}>
                    <Avatar.Image 
                        className="AvatarImage"
                        src={picture}/>
                    <Avatar.Fallback />
                </Avatar.Root>
                <h3 style={{marginTop: "0px"}}>{user}</h3>
                <button onClick={() => navigate(`/profile/${name}`)}> profile </button>
                <div style={{width: "90%", left: "5%", position:"relative"}}>
                    <p> rating {rating} stars</p>
                    <p style={{textAlign: "left"}}>{text}</p>
                </div>
                
        </div>
    );
}

export default ReviewCard