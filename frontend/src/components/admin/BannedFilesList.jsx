import BannedFile from "./BannedFile.jsx"

const BannedFilesList = ({ data }) => {
    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>History of banned files</h3>
            {data.map(
                (entry) => <BannedFile
                    id={entry.object_id}
                    type={entry.object_type}
                    reporter={entry.reporter_id}
                    reason={entry.reason}
                    timestamp={entry.reviewed_time}
                />
            )}
        </div>
    );
}

export default BannedFilesList;