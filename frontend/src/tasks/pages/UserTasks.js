import React, {useEffect, useState} from "react";

import TaskList from "../components/TaskList";
import {useParams} from "react-router-dom";
import {useHttpClient} from "../../shared/hooks/http-hook";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserTasks = () => {
    const [loadedTasks, setLoadedTasks] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/tasks/user/${userId}`);
                setLoadedTasks(responseData.tasks);
            } catch (err) {

            }
        };
        fetchTasks();
    }, [sendRequest, userId]);

    const taskDeletedHandler = deletedTaskId => {
        setLoadedTasks(prevTasks =>
            prevTasks.filter(task => task.id !== deletedTaskId)
        );
    };
    return (
        <React.Fragment>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedTasks && <TaskList items={loadedTasks} onDeleteTask={taskDeletedHandler}/>}
        </React.Fragment>
    )
};

export default UserTasks;
