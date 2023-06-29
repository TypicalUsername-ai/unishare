import { useState } from "react";
import ReportedFile from "./ReportedFile";

const FileList = ({ data = [] }) => {

    const [filtered, setFiltered] = useState(data);
    const [filter, setFilter] = useState(false);

    const toggleFilter = () => setFilter(!filter);

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            
            <div>
                <input type="text" onChange={(e) => {if (e.target.value ) setFiltered(data.filter((a) => a.reason.toString().includes(e.target.value)))}}/>
                <button onClick={toggleFilter}> filter toggle </button>
            </div>

            {
            filter ? filtered.map(
                (entry) => <ReportedFile 
                    fileid={entry.object_id}
                    reporter_id={entry.reporter_id}
                    report_id={entry.id}
                    reason={entry.reason}
                />
            ) 
            :
            data.map(
                (entry) => <ReportedFile 
                    fileid={entry.object_id}
                    reporter_id={entry.reporter_id}
                    report_id={entry.id}
                    reason={entry.reason}
                />
            ) 
            }
            </div>
    );
}

export default FileList;