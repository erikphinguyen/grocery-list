import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {

    const { id } = useParams();

    return (
        <div className='landing-page-container'>
            <div className='landing-page'>
                <h1>GROCERY DAY?</h1>
                <NavLink to={`users/${id}/tasks`}>
                    <button className='button' style={{ fontSize: '2rem'}} >LET'S MAKE A LIST</button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;
