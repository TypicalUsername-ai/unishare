import File from "../FileCard";
import { useState, useEffect } from "react";
import getAllFiles from "../../functions/getAllFiles";

export default function FileList () {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        getAllFiles().then(
            (data) => setFiles(data)
        );
    }, [])

    return (
        <div>
            {files.map(
                (entry) => <File username={entry.userid} title={entry.name} fileid={entry.id} picture={null}/>
            )}
        </div>
    );
}