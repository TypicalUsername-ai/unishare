import { useState, useEffect } from "react";
import getReportedUsers from "../../functions/getReportedUsers";
import ReportedUser from "../User/ReportedUser";

export default function UserList () {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getReportedUsers().then(
            (data) => setUsers(data)
        );
    }, [])

    function sorting ({sort}) {
        switch(sort){
            case 'number-of-reports':
                 
        }
    }



    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <div>
            <select name="cars" id="cars">
                <option value="number-of-reports">Number of reports</option>
                <option value="example1">example1</option>
                <option value="example2">example2</option>
                <option value="example3">example3</option>
            </select>
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