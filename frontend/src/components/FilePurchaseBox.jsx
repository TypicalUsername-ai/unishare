import { useParams } from "react-router-dom";

const FilePurchaseBox = ({price, transaction}) => {
    const { fileid } = useParams();

    return (
        <div>
            {transaction !== null ? 
                <p> You own this file </p>
                :
                <button> Buy this file ({price} tokens)</button>
            }
        </div>
    )
}

export default FilePurchaseBox;