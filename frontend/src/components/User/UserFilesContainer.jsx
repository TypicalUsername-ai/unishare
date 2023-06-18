import { useEffect, useState } from "react";
import File from "../FileCard";
import getUserFiles from "../../functions/getUserFiles";
import { useSelector } from 'react-redux';

const UserFilesContainer = ({ userid }) => {

    const token = useSelector((state) => state.token.token);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        getUserFiles(userid, token).then(
            (data) => setFiles(data)
        );
    }, [])

    return (
        <div style={{backgroundColor: "AliceBlue"}}>
            <h2>Latest files</h2>
            {files.map(
                (entry) => <File username={userid} title={entry.name} fileid={entry.id} picture={null}/>
            )}
            <button className="seeMore" style={{backgroundColor: "#4CA1AF", marginBottom: "20px"}}>See more</button>
        </div>
    );
}

export default UserFilesContainer