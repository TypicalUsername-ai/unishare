
const  BannedFile = ({ id, reason, type, reporter, timestamp }) => {

    const reviewed = new Date(timestamp.secs_since_epoch * 1000);

    return (
        <div>
            <div style={{ display: "flex", backgroundColor: "#4CA1AF", borderRadius: "45px", marginBottom: "20px", padding:"20px",  width:"300px", height: "500px" }}>
            <section style={{ textAlign: "left" }}>
                <h3 style={{ marginBottom: "8px" }}>{id}</h3>
                <h3>Reason for ban</h3>
                <p style={{ marginBottom: "8px" }}>{reason}</p>
                <h3>type: {type === 2 ? "File" : "User"}</h3>
                <section style={{display:"flex", flexDirection:"row"}}>
                </section>
                <h3>Date and Time of ban : {reviewed.toString()}</h3>
                <p style={{marginTop: "20px", marginLeft: "20px"}}></p>
            </section>
        </div>
        </div>
    );
}

export default BannedFile;