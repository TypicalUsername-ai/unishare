import FileCard from './FileCard';

const FileSearchResults = ({ data }) => {
    return (
        <div>
            {data.map(
                (file) => <FileCard 
                    username={"need still"} 
                    fileid={"need still"}
                    picture={null}
                    title={file.name}
                />
            )}
        </div>
    )
}

export default FileSearchResults;