import { useEffect, useState } from "react";
import getProfile from '../functions/getProfile';

const FileInfoCard = ({ data, snippet, transaction }) => {

    const created = new Date(data.created.secs_since_epoch * 1000);
    const modified = new Date(data.last_edit.secs_since_epoch * 1000);
    const [profile, setProfile] = useState("")
    const reciveAmount = data.price * 0.85

    useEffect(() => {
        getProfile(data.creator, null).then(
            (data) => setProfile(data.username)
        )
    }, [])

    return (
        <div>
            <h1>"{data.name}"</h1>
            <h2>Author: {profile}</h2>
            <h2>Price: {data.price} {transaction !== null ? (<p>You will recive {reciveAmount}</p>) : (<p></p>)}</h2>
            <h2>Rating: {data.rating}/5</h2>
            <h2>Tags: {data.primary_tag}, {data.secondary_tag}</h2>
            <h3>Created: {created.toString()}</h3>
            <h3>Last edit: {modified.toString()}</h3>
            <h3>File snippet:</h3>
            <p>"{snippet}..."</p>
        </div>
    )
}

export default FileInfoCard;