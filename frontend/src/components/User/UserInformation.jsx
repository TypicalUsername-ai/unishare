import React, { useEffect, useState } from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import UserFilesContainer from './UserFilesContainer';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import getProfile from '../../functions/getProfile';
import delUser from '../../functions/delUser';
import reportUser from '../../functions/reportUser';

function UserInformation(props) {
    const navigate = useNavigate();
    const id = props.id;
    const auth = useSelector((state) => state.token);

    const [user, setUser] = useState(null);
    const [reason, setReason] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        id &&
            getProfile(id, auth.token).then(
                (user) => setUser(user),
                (err) => {
                    console.warn(err);
                    redirect('/error');
                }
            );
    }, [id, auth]);

    const handleDeleteProfile = () => {

        delUser(user.id, auth.token).then((data) => {
            console.log(data);
        });
    };

    const handleReportUser = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {
        reportUser(user.id, auth.token, reason).then((data) => {
            console.log(data);
        });

        setReason('');
        setShowModal(false);
    };

    return (
        <div className="GlobalContainer">
            <section style={{ display: 'flex', verticalAlign: 'middle' }}>
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image className="AvatarImage" src="https://static2.strzelce360.pl/data/articles/xl-ernest-khalimov-czy-istnieje-kto-to-wiek-wzrost-waga-wikipedia-1669905523-full.jpg" />
                    <Avatar.Fallback />
                </Avatar.Root>
                <h1 style={{ marginLeft: '20px', position: 'relative', bottom: '15px' }}>Unishare</h1>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <button className="ActionButton" onClick={handleDeleteProfile}>
                        Delete Profile
          </button>
                    <button className="ActionButton" onClick={handleReportUser}>
                        Report User
          </button>
                </div>
            </section>
            <section style={{ backgroundColor: 'AliceBlue' }}>
                <h2>Information</h2>
                <div style={{ display: 'flex', verticalAlign: 'middle' }}>
                    <h3 style={{ marginBottom: '0px', marginLeft: '20px' }}>Username:&nbsp;&nbsp;</h3>
                    <h3>{user ? user.username : ''}</h3>
                </div>

                <div style={{ display: 'flex', verticalAlign: 'middle' }}>
                    <h3 style={{ marginTop: '0px', marginLeft: '20px' }}>Id:&nbsp;&nbsp;</h3>
                    <h3 style={{ marginTop: '0px' }}>{id}</h3>
                </div>
            </section>

            {/* Modal */}
            {showModal && (
                <div className="ModalContainer">
                    <div className="ModalContent">
                        <h2>Report User</h2>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter your reason..."
                        />
                        <button className="SubmitButton" onClick={handleSubmit}>
                            Submit
            </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserInformation;
