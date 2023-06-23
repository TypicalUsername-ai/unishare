import { useSelector } from "react-redux"
import Header from "../components/Header"
import { Navigate } from "react-router-dom";

const MyNotesPage = () => {

    const authorized = useSelector((state) => state.token.authorized);

    return (
        <div>
            {!authorized ? <Navigate to="/login?r=notes"/> : null }
            <Header/>
            My notes page:
        </div>
    )
}

export default MyNotesPage;