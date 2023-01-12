import React from 'react';
import {NavLink} from 'react-router-dom';

function LandingPage() {
    return (
        <div className='landing-page-container'>
            <div>
                <h1>GROCERY DAY?</h1>
                <NavLink to={`users/:id/tasks`}>
                    <button>LET'S MAKE A LIST</button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;
