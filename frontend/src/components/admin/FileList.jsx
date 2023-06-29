import { useState } from "react";
import ReportedFile from "./ReportedFile";

const FileList = ({ data = [] }) => {

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            <div>
                <p> File Id </p>
            <select name="reporter" selected="none">
                <option value="none"> None </option>
                {data.map((entry) => {
                    <option value={entry.reporter_id}>{entry.reporter_id}</option>
                })}
            </select>
                <p> Reason </p>
            <select name="reason">
                <option> None </option>
                {data.map((entry) => {
                    <option value={entry.reason}>{entry.reason}</option>
                })}
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