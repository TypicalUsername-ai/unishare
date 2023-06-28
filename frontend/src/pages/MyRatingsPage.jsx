import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getMyReviews from '../functions/getMyReviews';
import Header from '../components/Header'

const MyRatingsPage = () => {

    const user_id = useSelector((state) => state.user.id);
    const auth = useSelector((state) => state.token);

    const [data, setData] = useState([]);

    useEffect(() => {
        getMyReviews(auth.token).then(
            (data) => setData(data)
        )
    }, [user_id])

    return (
        <div>
            <Header/>
            {JSON.stringify(data)}
        </div>
    )
}

export default MyRatingsPage;