import { Link } from 'react-router-dom';

export default function FileUploadButton() {
    return (
        <div>
            <Link to="/upload">
                <button className='uploadButton'>Upload Files</button>
            </Link>
        </div>
    );
}