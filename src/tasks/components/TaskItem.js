import React from 'react';

import './TaskItem.css';

const TaskItem = props => {
    return <li className="task-item">
        <div className="task-item__content">
            <div className="task-item__info">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div className="task-item__actions">
                <button>EDIT</button>
                <button>DELETE</button>
            </div>
        </div>
    </li>
};


export default TaskItem;
