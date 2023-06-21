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
                    price={file.price}
                    rating={file.rating}
                    primaryTag={file.primaryTag}
                    secondaryTag={file.secondaryTag}
                    editStamp={file.last_edit}
                    available={file.available}
                />
            )}
        </div>
    )
}

export default FileSearchResults;