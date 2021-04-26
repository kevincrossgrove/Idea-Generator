import React, { useState } from 'react'
import ManageAccount from './auth/ManageAccount';
import '../css/Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState(true);
    const [manageAccount, setManageAccount] = useState(false);

    const manage = () => {
        setProfile(false);
        setManageAccount(true);
    }

    return (
        <div>
            {profile &&
            <button id="manageButton" onClick={() => manage()}>Manage Account</button>}
            {manageAccount && <ManageAccount setManageAccount={setManageAccount} setProfile={setProfile} />}
        </div>
    );
}

export default Profile;
