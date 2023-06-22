import FileList from "../components/admin/FileList";
import UserList from "../components/admin/UserList";


export default function AdminPanel(){
    return(
        <div>
                <h1>Welcome Admin</h1>
                <FileList/>
                <UserList/>
        </div>
    );
}