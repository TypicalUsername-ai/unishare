import { useSelector } from "react-redux"
import Header from "../components/Header"
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserFiles from "../functions/getUserFiles";
import FileCard from "../components/FileCard";

const MyNotesPage = () => {

    const authorized = useSelector((state) => state.token.authorized);
    const token = useSelector((state) => state.token.token);
    const user_id = useSelector((state) => state.user.id);

    const [owned, setOwned] = useState([]);
    const [purchased, setPurchased] = useState([]);

    useEffect(() => {
        getUserFiles(user_id, token).then(
            (data) => setOwned(data)
        )
    }, [])

    return (
        <div>
            {!authorized ? <Navigate to="/login?r=notes"/> : null }
            <Header/>
            <p>Owned</p>
            {owned.map(
                (file) => <FileCard 
                username={file.creator} 
                fileid={file.id}
                picture={null}
                title={file.name}
                price={file.price}
                rating={file.rating}
                primaryTag={file.primaryTag}
                secondaryTag={file.secondaryTag}
                editStamp={file.last_edit}
                available={file.available}
            />
            )}
            <p>Purchased:</p>
            {purchased.map(
                (file) => <FileCard 
                username={file.creator} 
                fileid={file.id}
                picture={null}
                title={file.name}
                price={file.price}
                rating={file.rating}
                primaryTag={file.primaryTag}
                secondaryTag={file.secondaryTag}
                editStamp={file.last_edit}
                available={file.available}
            />
            )}
        </div>
    )
}

export default MyNotesPage;