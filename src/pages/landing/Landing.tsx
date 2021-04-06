import React from 'react';

import './Landing.css'

const Landing: React.FC = ({ children }) => {
    return (
        <div className="landing-container">
            <div className="landing">
                { children }
            </div>    
        </div>
    );
}

export default Landing;