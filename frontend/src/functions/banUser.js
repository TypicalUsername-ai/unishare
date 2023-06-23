import deleteUser from "./deleteUser";

export default function banUser (id, token){
    //send email to user with message
    deleteUser(id, token);
}