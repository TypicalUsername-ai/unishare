import FileList from "../components/admin/FileList";
import UserList from "../components/admin/UserList";


export default function AdminPanel(){
    return(
        <div style={{width:"100%"}}>
                <h1>Welcome Admin</h1>
                <section style={{display:"flex", width:"100%"}}>
                    <FileList/>
                    <UserList/>
                </section>
                
        </div>
    );
}