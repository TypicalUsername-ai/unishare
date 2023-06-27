import deleteUser from "./deleteUser";
import acceptReport from "./acceptReport";

export default function banUser (id, token){
    //send email to user with message
    acceptReport(id,token);
    deleteUser(id, token);
}

// not needed we delete users on ban