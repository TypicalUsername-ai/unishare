import BannedFile from "./BannedFile.jsx"

export default function BannedFilesList () {
    return (
        <div style={{padding:"20px", background:"#ADD8E6"}}>
            <h3>History of banned files</h3>
            <div>
                Type of file
            <select name="sort">
                <option value="example">example</option>
                <option value="example1">example1</option>
                <option value="example2">example2</option>
                <option value="example3">example3</option>
            </select>
            </div>
            <BannedFile
            name="ernest"
            reason="Nie wiem co napisac"
            tag="informatyka"
            />
            <BannedFile
            name="ernest"
            reason="Nie wiem co napisac"
            tag="informatyka"
            />
        </div>
    );
}