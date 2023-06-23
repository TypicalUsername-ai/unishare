import ReportedFile from "./ReportedFile";
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
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            <div>
                Type of file
            <select name="sort">
                <option value="example">example</option>
                <option value="example1">example1</option>
                <option value="example2">example2</option>
                <option value="example3">example3</option>
            </select>
            </div>
            {files.map(
                (entry) => <ReportedFile username={entry.userid} title={entry.name} fileid={entry.id} picture={null}/>
            )}

            <ReportedFile username="userID" title="Name" fileid="fieldID" report="report" tag="tag" picture={null}/>
            <ReportedFile username="userID" title="Name" fileid="fieldID" report="report" tag="tag" picture={null}/>
        </div>
    );
}