import { useState } from "react";
import ReportedFile from "./ReportedFile";

const FileList = ({ data = [] }) => {

    const [filtered, setFiltered] = useState(data);

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            <div>
                <input type="text" onChange={(e) => setFiltered(data.filter((entry) => entry.reason.contains(e.target.value)))}/>
            </div>
            {filtered.map(
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