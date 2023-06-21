import * as Avatar from '@radix-ui/react-avatar';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import getProfile from '../functions/getProfile';



const FileCard = ({
    username, 
    fileid, 
    picture, 
    title, 
    price, 
    rating, 
    primaryTag, 
    secondaryTag, 
    editStamp, 
    available
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/file/${fileid}`);
    };

    const [profile, setProfile] = useState("")

    useEffect(() => {
        getProfile(username, null).then(
            (data) => setProfile(data.username)
        )
    }, [])

    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px" }} >
            <Avatar.Root className="AvatarRoot" style={{ borderRadius: "20px" }}>
                <Avatar.Image
                    className="AvatarImage"
                    src={picture} />
                <Avatar.Fallback />
            </Avatar.Root>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{title}</h3>
                <h4>author : {profile}</h4>
                {available ? 
                    <h4>price : {price}</h4>
                    :
                    <h4>File unavailable</h4>
                }
                {primaryTag || secondaryTag ? 
                <h4>Tags: [{primaryTag}, {secondaryTag}]</h4> 
                : null
                }
                <button onClick={handleClick} className='seeMore'>Details</button>
            </section>

        </div>
    );
}

export default FileCard