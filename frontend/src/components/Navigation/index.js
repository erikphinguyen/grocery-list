import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Demo from '../Demo.js/Demo.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} style={{border: '5px solid blue'}}/>
        );
    } else {
        sessionLinks = (
            <>
                <Demo />
                <LoginFormModal />
                <p style={{color: 'white', textDecoration: 'none', opacity: '0.85'}}>Sign Up</p>
            </>
        );
    }

    return (
        <nav>
            <div className='navigation'>
                <div className='nav-home'>
                    <NavLink exact to="/" style={{color: 'white', textDecoration: 'none', opacity: '0.85'}}>Home</NavLink>
                </div>
                <div className='nav-fx'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
