import React, {useContext} from 'react';

import Button from "../../shared/components/FormElements/Button";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './TaskItem.css';

const TaskItem = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(`http://localhost:5000/api/tasks/${props.id}`,
                'DELETE')
            props.onDelete(props.id);
        } catch (err) {
        }
    };

    return (
        <React.Fragment>
            <div>{error}</div>
            <li className="task-item">
                <div className="task-item__content">
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className="task-item__info">
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div className="task-item__actions">
                        {auth.userId === props.creatorId && (
                            <Button to={`/tasks/${props.id}`}>EDIT</Button>
                        )}
                        {auth.userId === props.creatorId && (
                            <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                        )}
                    </div>
                </div>
            </li>
        </React.Fragment>

    )
};


export default TaskItem;
