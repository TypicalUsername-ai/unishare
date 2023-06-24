import { useSelector } from "react-redux"
import Header from "../components/Header"
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserFiles from "../functions/getUserFiles";
import FileCard from "../components/FileCard";
import getProfile from "../functions/getProfile";
import getPurchasedFiles from "../functions/getPurchasedFiles";

const MyNotesPage = () => {

    const authorized = useSelector((state) => state.token.authorized);
    const token = useSelector((state) => state.token.token);
    const user_id = useSelector((state) => state.user.id);
    const navigate = useNavigate();

    const [owned, setOwned] = useState([]);
    const [purchased, setPurchased] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        getProfile(user_id, token).then(
            (data) => setUser(data)
        );
        getUserFiles(user_id, token).then(
            (data) => setOwned(data)
        );
        getPurchasedFiles(user_id, token).then(
            (data) => setPurchased(data)
        );
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
            <button onClick={() => navigate("/upload")}>Upload more</button>
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