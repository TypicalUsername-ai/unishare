import * as Avatar from '@radix-ui/react-avatar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const FileCard = ({username, fileid, picture, title}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/file/${fileid}`);
    };
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
                <h4>author : {username}</h4>
                <button onClick={handleClick} className='seeMore'>Details</button>
            </section>

        </div>
    );
}

export default FileCard