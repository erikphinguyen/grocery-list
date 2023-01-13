import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormModal';
import './Navigation.css';
import Demo from '../Demo.js/Demo.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='session-container'>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <Demo />
                <LoginFormModal />
                <SignUpFormModal />
            </>
        );
    }

    return (
        <nav>
            <div className='navigation'>
                <div className='nav-home'>
                    <NavLink exact to="/" style={{ color: 'white', textDecoration: 'none', opacity: '0.85' }}>Home</NavLink>
                </div>
                <div className='nav-fx'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
