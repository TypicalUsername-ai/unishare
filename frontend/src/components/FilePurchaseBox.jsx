import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const FilePurchaseBox = ({ price, transaction }) => {
    const { fileid } = useParams();
    const [canChangePrice, setCanChangePrice] = useState(false);
    const [newPrice, setNewPrice] = useState("");

    const authToken = useSelector((state) => state.token.token);

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
                console.log("Price changed");
            } else {
                console.error("Error changing the price: " + response);
            }
        } else {
            console.error("Invalid price");
        }
    };

    return (
        <div>
            {transaction !== null ? (
                <>
                    <p>You own this file</p>

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
                    <button>Buy this file ({price} tokens)</button>
                )}
        </div>
    );
};

export default FilePurchaseBox;
