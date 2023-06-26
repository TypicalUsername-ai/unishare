import { useState, useEffect } from "react";
import getReports from "../../functions/getReports";
import ReportedUser from "../User/ReportedUser";
import { useSelector } from "react-redux";

export default function UserList () {

    const [reports, setReports] = useState([]);
    const auth = useSelector((state) => state.token);
    
    useEffect(() => {
        getReports(auth.token).then(
            (data) => {console.log(data); setReports(data);}
        );
        
        console.log("token:");
        console.log(auth.token);
        console.log("JSON: " + reports);
        console.log(reports.user_reports);
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
                <option value="type1">example1</option>
                <option value="type2">example2</option>
                <option value="type3">example3</option>
            </select>
            </div>
            
            <ReportedUser
                name="name"
                report="uzytkownik wystawia obnazajace zdjecia"
                tag="TAGexample"
                id=""
                token=""
            />
             <ReportedUser
                name="name"
                report="uzytkownik wystawia obnazajace zdjecia"
                id=""
                token=""
            />
        </div>
    );
}