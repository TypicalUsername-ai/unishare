import { useParams } from "react-router-dom";

const FilePurchaseBox = ({price, owned}) => {
    const { fileid } = useParams();

    return (
        <div>
            {owned ? 
                <p> You own this file </p>
                :
                <button> Buy this file ({price} tokens)</button>
            }
        </div>
    )
}

export default FilePurchaseBox;