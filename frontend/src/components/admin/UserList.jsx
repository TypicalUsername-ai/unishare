import { useState, useEffect } from "react";
import getReportedUsers from "../../functions/getReportedUsers";
import ReportedUser from "../User/ReportedUser";

export default function UserList () {

    const [users, setUsers] = useState([]);

    return (
        <div>
            <ReportedUser/>
        </div>
    );
}