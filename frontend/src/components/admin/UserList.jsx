import { useState } from "react";
import ReportedUser from "../User/ReportedUser";

const UserList = ({ data = []}) => {

    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState(""); 
    const [option, setOption] = useState("");

    const handleFilter = () => {
        let newData = data.filter(
            (entry) => entry.reason == option
        )
        setFilteredData(newData)
        
        let searchData = newData.filter(
                (entry) => entry.id == search 
        )
        
        if (search != ""){
            setFilteredData(searchData);
        } 
        
        console.log(newData); 
        console.log(searchData); 
    }
    
    const handleInput = (event) => {
        setSearch(event.value);
    }

    const handleOption = (event) => {
        setOption(event.value);
    } 


    return (
        <div style={{ padding: "20px", background: "#ADD8E6" }}>
            <h3>Reported Users</h3>
            <div>
                <p> User Id </p>
            <select name="userid">
                <option> None </option>
                {filteredData.map((entry) => {
                    <option value={entry.object_id}>{entry.object_id}</option>
                })}
            </select>
                <p> Reason </p>
            <select name="reason">
                <option> None </option>
                {filteredData.map((entry) => {
                    <option value={entry.reason}>{entry.reason}</option>
                })}
            </select>
            </div>

            {data.map(
                (entry) => <ReportedUser 
                    id={entry.id}
                    reporter_id={entry.reporter_id}
                    reason={entry.reason}
                    name = {entry.object_id}
                />
            )}
        </div>
    );
}

export default UserList;