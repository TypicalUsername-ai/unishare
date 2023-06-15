import * as Avatar from '@radix-ui/react-avatar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function FileCard(props) {
    const navigate = useNavigate();
    const { username } = useParams();
    const handleClick = () => {
        navigate(`/${username}/examplefile`); //statick for now
    };
    return (
        <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px" }} >
            <Avatar.Root className="AvatarRoot" style={{ borderRadius: "20px" }}>
                <Avatar.Image
                    className="AvatarImage"
                    src={props.picture} />
                <Avatar.Fallback />
            </Avatar.Root>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{props.title}</h3>
                <button onClick={handleClick} className='seeMore'>Details</button>
            </section>

        </div>
    );
}

export default FileCard