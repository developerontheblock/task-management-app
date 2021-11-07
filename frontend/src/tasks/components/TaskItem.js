import React from 'react';

import Button from "../../shared/components/FormElements/Button";
import './TaskItem.css';

const TaskItem = props => {
    const confirmDeleteHandler = () => {
        console.log('deleting...');
    };

    return <li className="task-item">
        <div className="task-item__content">
            <div className="task-item__info">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
            <div className="task-item__actions">
                <Button to={`/tasks/${props.id}`}>EDIT</Button>
                <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
            </div>
        </div>
    </li>
};


export default TaskItem;
