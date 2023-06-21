import FileCard from './FileCard';

const FileSearchResults = ({ data }) => {
    return (
        <div>
            {data.map(
                (file) => <FileCard 
                    username={file.creator} 
                    fileid={file.id}
                    picture={null}
                    title={file.name}
                />
            )}
        </div>
    )
}

export default FileSearchResults;