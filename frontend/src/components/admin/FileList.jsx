import { useState } from "react";
import ReportedFile from "./ReportedFile";

const FileList = ({ data }) => {

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            <div>
                Type of file
            <input></input>
            <select name="sort">
                    <option value="file-id">Inapropriate Language</option>
                    <option value="bullying">Bullying</option>
                    <option value="photos">Inapropriate Photos</option>
                    <option value="other">Other</option>
            </select>
            </div>
            {data.map(
                (entry) => <ReportedFile 
                    fileid={entry.object_id}
                    reporter_id={entry.reporter_id}
                    report_id={entry.id}
                    reason={entry.reason}
                />
            )}
            </div>
    );
}

export default FileList;