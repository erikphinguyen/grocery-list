import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button className="button" onClick={openMenu}>
                Profile
                {/* <i className="fas fa-user-circle" /> */}
            </button>
            {showMenu && (
                <>
                    <div className="profile-dropdown">
                        <div><b>Username:</b> {user.username}</div>
                        <div><b>Email:</b> {user.email}</div>
                    </div>
                    <NavLink exact to="/">
                        <button className="button" onClick={logout}>Log Out</button>
                    </NavLink>
                    {/* <NavLink exact to="/" className="button" onClick={logout} style={{textDecoration:'none', fontSize:'85%'}}>
                        {console.log('clicking logout')}Log Out
                    </NavLink> */}
                </>
            )}
        </>
    );
}

export default ProfileButton;
