import { useParams } from "react-router-dom";
import buyFile from '../functions/buyFile'
import { useSelector } from "react-redux"

const FilePurchaseBox = ({price, transaction}) => {
    const { fileid } = useParams();
    const token = useSelector((state) => state.token.token);

    const handleBuy = () => {
        buyFile(fileid, token).then(
            (ok_data) => {
                alert("File purchased, refresh page to access");
            }
        )
    }

    return (
        <div>
            {transaction !== null ? 
                <p> You own this file </p>
                :
                <button onClick={handleBuy}> Buy this file ({price} tokens)</button>
            }
        </div>
    )
}

export default FilePurchaseBox;