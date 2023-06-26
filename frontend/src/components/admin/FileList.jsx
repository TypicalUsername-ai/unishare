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

            <ReportedFile username="userID" title="Name" fileid="fieldID" report="report" tag="tag" />
            <ReportedFile username="userID" title="Name" fileid="fieldID" report="report" tag="tag" />
        </div>
    );
}