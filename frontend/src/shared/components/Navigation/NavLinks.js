import React, {useContext} from 'react';

import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/auth-context";
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>All users</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/${auth.userId}/tasks`}>My Tasks</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/tasks/new">Add task</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/tasks/terms">Terms and conditions</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">Log In</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
              <button onClick={auth.logout}>LOGOUT</button>
            </li>
        )}
    </ul>
};

export default NavLinks;
