import { useState } from "react";
import ReportedFile from "./ReportedFile";

const FileList = ({ data }) => {

    function sorting ({sort}) {
        switch(sort){
            case 'number-of-reports':
                users.sort(sortMethods.descending);
                break;
            case "type1":
                const UsersType1 = reports.filter((users) => users.tag === "type1");
                setReports(UsersType1);
                break;
            case "type2":
                    const UsersType2 = reports.filter((users) => users.tag === "type2");
                    setReports(UsersType2);
                    break;
        }

    }

    const [filteredData, setFilteredData] = useState(data);

    const handleFilter = () => {
        let newData = data.filter(
            
        )
    }

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            <div>
                Type of file
            <input></input>
            <select name="sort">
                <option value="filename">File name</option>
                <option value="tag">File tag</option>
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