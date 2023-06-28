import { useState } from "react";
import ReportedUser from "../User/ReportedUser";

const UserList = ({ data }) => {

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
                <input type="text" onClick={handleInput}></input>
                <select name="sort" onClick={handleOption}>
                    <option value="language">Inapropriate Language</option>
                    <option value="bullying">Bullying</option>
                    <option value="photos">Inapropriate Photos</option>
                    <option value="other">Other</option>

                </select>
                <button onClick={handleFilter}>Search</button>
            </div>

            {data.map(
                (entry) => <ReportedUser 
                    id={entry.id}
                    reporter_id={entry.reporter_id}
                    reason={entry.reason}
                />
            )}
        </div>
    );
}

export default UserList;