import ReportedFile from "./ReportedFile";
import { useState, useEffect } from "react";
import getReports from "../../functions/getReports";
import { useSelector } from "react-redux";

export default function FileList () {

    const [reports, setReports] = useState([]);
    const token = useSelector((state) => state.token.token);

    useEffect(() => {
        getReports(token).then(
            (data) => setReports(data)
        );
    }, [])

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

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Files</h3>
            <div>
                Type of file
            <select name="sort">
                <option value="number-of-reports">example</option>
                <option value="type1">example1</option>
                <option value="type2">example2</option>
                <option value="type3">example3</option>
            </select>
            </div>

            <ReportedFile username="userID" title="Name" fileid="fieldID" report="report" tag="tag" />
            <ReportedFile username="userID" title="Name" fileid="fieldID" report="report" tag="tag" />
        </div>
    );
}