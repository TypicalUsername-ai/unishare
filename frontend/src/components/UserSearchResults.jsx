import UserCard from "./UserCard";

const UserSearchResults = ({ data }) => {
    return (
        <div>
            {data.map(
                (entry) => 
                <UserCard data={entry}/>
            )}
        </div>
    )
};

export default UserSearchResults;