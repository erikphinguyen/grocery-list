import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './LandingPage.css';

function LandingPage({user}) {

    return (
        <div className='landing-page-container'>
            <div className='landing-page'>
                <h1>GROCERY DAY?</h1>
                {
                    user ?
                <NavLink exact to={`/users/${user.id}/tasks`}>
                    <button className='button' style={{ fontSize: '2rem'}} >LET'S MAKE A LIST</button>
                </NavLink>
                : <p className='false-statement'>LOG IN TO VISIT YOUR LIST</p>
                }
            </div>
        </div>
    )
}

export default LandingPage;
