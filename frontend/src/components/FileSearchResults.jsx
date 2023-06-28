import { useState } from 'react';
import FileCard from './FileCard';

const FileSearchResults = ({ data = [] }) => {

    const splitChunks = (sourceArray, chunkSize) => {
        if(chunkSize <= 0)
          throw "chunkSize must be greater than 0";
        let result = [];
        for (var i = 0; i < sourceArray.length; i += chunkSize) {
          result[i / chunkSize] = sourceArray.slice(i, i + chunkSize);
        }
        return result;
    }

    const [page, setPage] = useState(0);
    const resChunks = splitChunks(data, 10);
    console.log()

    const nextPage = () => {
        setPage((page + 1) % resChunks.length);
    }
    const prevPage = () => {
        setPage((page - 1) % resChunks.length);
    }

    return (
        <div>
            <div>
                <button onClick={prevPage}> previous </button>
                <p> on page {page+1} out of {resChunks.length} </p>
                <button onClick={nextPage}> next </button>
            </div>
            {resChunks[0] && resChunks[page].map(
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