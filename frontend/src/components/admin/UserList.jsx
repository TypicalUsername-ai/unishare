import { useState, useEffect } from "react";
import getReportedUsers from "../../functions/getReportedUsers";
import ReportedUser from "../User/ReportedUser";
import SelectTab from "./selectTab";

export default function UserList () {

    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        getReportedUsers().then(
            (data) => setUsers(data)
        );
    }, [])

    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <div>
                <SelectTab/>
            </div>
            <ReportedUser
                name="name"
                report="uzytkownik wystawia obnazajace zdjecia"
            />
             <ReportedUser
                name="name"
                report="uzytkownik wystawia obnazajace zdjecia"
            />
        </div>
    );
}