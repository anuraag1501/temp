import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import "../../styles/common/Card.css";


const Card = ({ logo, title, description, onClick }) => {
    return (
        <div className='card-container' onClick={onClick}>
            <div className="logo">
                <img src={logo} alt={title} />
            </div>

            <div className="body">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>

            <div className="footer">
                <ArrowForwardIcon sx={{fontSize: "50px"}} />
            </div>
        </div>
    );
};

export default Card