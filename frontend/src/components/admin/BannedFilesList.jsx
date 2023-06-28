import BannedFile from "./BannedFile.jsx"

const BannedFilesList = ({ data }) => {
    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>History of banned files</h3>
            {data.map(
                (entry) => <BannedFile
                    id={entry.object_id}
                    reporter={entry.reporter_id}
                    reason={entry.reason}
                />
            )}
        </div>
    );
}

export default BannedFilesList;