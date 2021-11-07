import React from "react";

import TaskList from "../components/TaskList";
import {useParams} from "react-router-dom";

// dummy array with data
const TASKS = [
    {
      id: 't1',
      title: 'Frontend bug',
      description: 'This bug need to be fixed',
      creator: 'u1'
    },
    {
        id: 't2',
        title: 'Backend bug',
        description: 'This bug need to be fixed. It is with high priority',
        creator: 'u2'
    }
]
const UserTasks = () => {
    const userId = useParams().userId;
    const loadedTasks = TASKS.filter(task => task.creator === userId); // only load task, which are created by specific user

    return <TaskList items={loadedTasks}/>
};

export default UserTasks;
