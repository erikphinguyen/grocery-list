import React from 'react';
import {NavLink} from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className='landing-page-container'>
            <div className='landing-page'>
                <h1>GROCERY DAY?</h1>
                <NavLink to={`users/:id/tasks`}>
                    <button>LET'S MAKE A LIST</button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;
