import React from 'react';

import {NavLink} from "react-router-dom";
import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
            <li>
                <NavLink to="/" exact>All users</NavLink>
            </li>
            <li>
                <NavLink to="/u1/tasks">My Tasks</NavLink>
            </li>
            <li>
                <NavLink to="/tasks/new">Add task</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Log In</NavLink>
            </li>
        </ul>
};

export default NavLinks;
