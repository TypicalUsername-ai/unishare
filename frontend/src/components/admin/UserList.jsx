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
                 users.sort(sortMethods.descending);
        }
    }

    const sortMethods = {
        none: {method: (a,b) => null},
        descending: {method: (a,b) => (a > b ? -1 : 1)}
    }



    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>Reported Users</h3>
            <div>
            <select name="sort">
                <option value="number-of-reports">Number of reports</option>
                <option value="example1">example1</option>
                <option value="example2">example2</option>
                <option value="example3">example3</option>
            </select>
            </div>
            {users.map(
                (entry) => <ReportedUser name={entry.name} report={entry.report} tag={entry.tag}/>
            )}
            <ReportedUser
                name="name"
                report="uzytkownik wystawia obnazajace zdjecia"
                tag="TAGexample"
            />
             <ReportedUser
                name="name"
                report="uzytkownik wystawia obnazajace zdjecia"
            />
        </div>
    );
}