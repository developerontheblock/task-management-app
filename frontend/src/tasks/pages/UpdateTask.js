import React, {useContext, useEffect, useState} from 'react';

import {useParams, useHistory} from 'react-router-dom';
import {useForm} from '../../shared/hooks/form-hook';
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import './TaskForm.css';


const UpdateTask = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedTask, setLoadedTask] = useState();
    const taskId = useParams().taskId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/tasks/${taskId}`)
                setLoadedTask(responseData.task);

                setFormData({
                    title: {
                        value: responseData.task.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.task.description,
                        isValid: true
                    }
                }, true);
            } catch (err) {
            }
        }
        fetchTask();
    }, [sendRequest, taskId, setFormData])


    const taskUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/tasks/${taskId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push('/' + auth.userId + '/tasks');
        } catch (err) {
        }
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner/>
            </div>
        );
    }

    if (!loadedTask && !error) {
        return (
            <div className="center">
                <h2>task not found!</h2>
            </div>
        );
    }


    return (
        <React.Fragment>
            <div>{error}</div>
            {!isLoading && loadedTask && (<form className="task-form" onSubmit={taskUpdateSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        initialValue={loadedTask.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(10)]}
                        errorText="Please enter a valid description (min. 10 characters)."
                        onInput={inputHandler}
                        initialValue={loadedTask.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        Update task
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default UpdateTask;
