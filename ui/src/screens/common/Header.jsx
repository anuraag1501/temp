import React from 'react';
import PersonIcon from '@mui/icons-material/Person';

import "../../styles/common/Header.css";

const Header = ({ title, userName, profilePic }) => {
    return (
        <div className='header-container'>
            <div className='title'>{title}</div>

            <div className='user-info'>
                <div className='greet-msg'>
                    Welcome,
                    <span className='name'>{userName}</span>
                </div>

                <div className='profileIcon'>
                    {profilePic ?? <PersonIcon />}
                </div>
            </div>
        </div>
    )
}

export default Header;
