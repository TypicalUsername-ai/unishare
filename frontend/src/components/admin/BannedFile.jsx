
const  BannedFile = ({ id, reason, tag, adminName }) => {

    return (
        <div>
            <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "500px" }}>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{id}</h3>
                <h3>Reason for ban</h3>
                <p style={{ marginBottom: "8px" }}>{reason}</p>
                <section style={{display:"flex", flexDirection:"row"}}>
                </section>
                <h3>Date and Time of ban</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}></p>
            </section>
        </div>
        </div>
    );
}

export default BannedFile;