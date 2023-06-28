import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import buyFile from '../functions/buyFile';
import { useNavigate } from "react-router-dom";

const FilePurchaseBox = ({ price, transaction }) => {
    const { fileid } = useParams();
    const [canChangePrice, setCanChangePrice] = useState(false);
    const [newPrice, setNewPrice] = useState("");
    const navigate = useNavigate();

    const authToken = useSelector((state) => state.token.token);
    const authorization = useSelector((state) => state.token.authorized);

    const userId = useSelector((state) => state.user.id);


    const handleChangePrice = async (e) => {
        e.preventDefault();
        if (newPrice >= 10 && newPrice <= 99999) {
            const currentTime = Date.now();
            const response = await fetch(
                `http://localhost/api/files/${fileid}/pricechange`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        price: newPrice,
                        timestamp: currentTime,
                    }),
                }
            );

            if (response.ok) {
                alert("Price have been updated!")
                console.log("Price changed");
            } else {
                console.error("Error changing the price: " + response);
            }
        } else {
            console.error("Invalid price");
        }
    };
    const handleBuy = async (e) => {
        if (!authorization) {
            alert("You must be logged in to buy a file!")
            return;
        }
        buyFile(userId, fileid, authToken).then(
            (r) => {
                alert("File purchase succesful")
                navigate("/notes")
            },
            (err) => alert(err)
        )
    }
    return (
        <div>
            {transaction !== null ? (
                <>
                    <button onClick={() => navigate(`content`)}> view file </button>

                    {canChangePrice ? (
                        <form onSubmit={handleChangePrice}>
                            <input
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                min={10}
                                max={99999}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    ) : (
                            <button onClick={() => setCanChangePrice(true)}>
                                Change price
            </button>
                        )}
                </>
            ) : (
                    <button onClick={handleBuy}>Buy this file ({price} tokens)</button>
                )}
        </div>
    );
};

export default FilePurchaseBox;
