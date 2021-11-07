import React from 'react';

import TaskItem from "./TaskItem";

import './TaskList.css'

const TaskList = props => {

    if (props.items.length === 0) {
        return (
            <div className="task-list center">
                <h2>No tasks found</h2>
            </div>
        );
    }

    return <ul className="task-list">
        {props.items.map(task =>
            <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                creatorId={task.creator}
                onDelete={props.onDeleteTask}
            />
        )}
    </ul>
};


export default TaskList;
