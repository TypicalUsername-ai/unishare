import React, { useEffect, useState } from 'react';
import getProfile from '../functions/getProfile';
import reportFile from '../functions/reportFile';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const FileInfoCard = ({ data, snippet, transaction }) => {
    const created = new Date(data.created.secs_since_epoch * 1000);
    const modified = new Date(data.last_edit.secs_since_epoch * 1000);
    const [profile, setProfile] = useState('');
    const [isReportOpen, setReportOpen] = useState(false);
    const [reason, setReason] = useState('');
    const auth = useSelector((state) => state.token);
    const userId = useSelector((state) => state.user.id);

    const { fileId } = useParams();
    const navigate = useNavigate();



    const handleReportFile = () => {
        setReportOpen(true);
    };

    const handleSubmitReport = () => {
        reportFile(data.id, auth.token, reason).then((err) => {
            console.log(err);
        });
        setReason('');
        setReportOpen(false);
    };

    useEffect(() => {
        getProfile(data.creator, null).then((data) => setProfile(data.username));
    }, []);

    return (
        <div>
            <h1>"{data.name}"</h1>
            <h2>Author: {profile}</h2>
            <h2>
                Price: {data.price}{' '}
                {transaction !== null ? (
                    <p>You will receive {Math.floor(data.price * 0.85)} tokens.</p>
                ) : (
                        <p></p>
                    )}
            </h2>
            <h2>Rating: {data.rating}/5</h2>
            <h2>Tags: {data.primary_tag}, {data.secondary_tag}</h2>
            <h3>Created: {created.toString()}</h3>
            <h3>Last edit: {modified.toString()}</h3>
            <h3>File snippet:</h3>
            <p>"{snippet}..."</p>
            <div>
                <button className="ActionButton" onClick={handleReportFile}>
                    Report File
        </button>
                {isReportOpen && (
                    <div>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter the reason for reporting the file"
                        />
                        <button onClick={handleSubmitReport}>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileInfoCard;
