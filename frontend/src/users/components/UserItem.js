import React from 'react';

import { Link } from "react-router-dom";
import './UserItem.css';

const UserItem= props => {
    return (
        <li className="user-item">
            <div className="user-item__content">
                <Link to={`/${props.id}/tasks`}>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.taskCount} {props.taskCount === 1 ? 'Task' : 'Tasks'}</h3>
                    </div>
                </Link>
            </div>
        </li>
    );
};


export default UserItem;
