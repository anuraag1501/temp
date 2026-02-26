import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../../styles/home/Home.css";

import logo from "../../assets/logo_bcg.png";
import product_data from "../../assets/product_data.jpg";
import ca from "../../assets/competitor_analysis.jpg";
import Card from '../common/Card';

const cardProps = [
    {
        logo: product_data,
        title: "Create and Manage Product",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        url: "/product"
    },
    {
        logo: ca,
        title: "Pricing Optimization",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        url: "/pricing"
    }
];

const Home = () => {
    const navigate = useNavigate();

    const handleCardClick = (url) => {
        navigate(url);
    };

    return (
        <div className='home-container'>
            <div className='logo'>
                <img src={logo} alt="BCG Logo" width="150" height="50" />
            </div>

            <div className='info'>
                <div className='heading'>Price Optimization Tool</div>
                <div className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                </div>
            </div>

            <div className='nav-cards'>
                {
                    cardProps.map((cardProp, index) => (
                        <Card
                            key={index}
                            logo={cardProp.logo}
                            title={cardProp.title}
                            description={cardProp.description}
                            onClick={() => handleCardClick(cardProp.url)}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Home;
