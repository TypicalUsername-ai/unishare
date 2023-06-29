import { useState } from "react";
import ReportedUser from "../User/ReportedUser";

const UserList = ({ data = []}) => {

    const [filteredData, setFilteredData] = useState(data);
    const [search, setSearch] = useState(""); 
    const [option, setOption] = useState("");
        const [filter, setFilter] = useState(false);

    const toggleFilter = () => setFilter(!filter);

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
                <input type="text" onChange={(e) => {if (e.target.value ) setFilteredData(data.filter((a) => a.reason.toString().includes(e.target.value)))}}/>
                <button onClick={toggleFilter}> filter toggle {filter}</button>
            </div>

            {filter ? 
            filteredData.map(
                (entry) => <ReportedUser 
                    id={entry.id}
                    reporter_id={entry.reporter_id}
                    reason={entry.reason}
                    name = {entry.object_id}
                />
            )
            :
            data.map(
                (entry) => <ReportedUser 
                    id={entry.id}
                    reporter_id={entry.reporter_id}
                    reason={entry.reason}
                    name = {entry.object_id}
                />
            )
            }
        </div>
    );
}

export default UserList;