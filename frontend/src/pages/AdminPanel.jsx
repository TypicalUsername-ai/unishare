import ReportButton from "../components/User/ReportButton";
import BannedFilesList from "../components/admin/BannedFilesList";
import FileList from "../components/admin/FileList";
import UserList from "../components/admin/UserList";
import Header from '../components/Header'
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getReports from "../functions/getReports";
import { useSelector } from "react-redux";

export default function AdminPanel(){

    const [reports, setReports] = useState({
        file_reports : [],
        user_reports : [],
        report_log : []
    });
    const auth = useSelector((state) => state.token);

    useEffect(() => {
        getReports(auth.token).then(
            (data) => { console.log(data); setReports(data); }
        );
    }, [])

    return(
        <div style={{width:"100%"}}>
                 {!auth.authorized ? <Navigate to="/login?r=admin-panel" /> : null}
                <Header/>
                <h1>Welcome Admin</h1>
                <section style={{display:"flex", width:"100%"}}>
                    <FileList data={reports.file_reports}/>
                    <UserList data={reports.user_reports}/>
                    <BannedFilesList data={reports.report_log}/>
                    <ReportButton
                    headline="ReportUser"
                    headline2="ReportUser"
                    />
                    
                </section>
                
        </div>
    );
}