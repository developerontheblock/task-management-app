import React, {useContext} from 'react';

import { useHistory } from 'react-router-dom';
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import {useForm} from '../../shared/hooks/form-hook';
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import './TaskForm.css';


const NewTask = () => {
    // this set up a listener in our contect here in the new task component
    const auth = useContext(AuthContext);

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const history = useHistory();

    const taskSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest('http://localhost:5000/api/tasks',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    creator: auth.userId
                }),
                {'Content-Type': 'application/json'}
            );
            history.push('/');
            //  redirect the user to different page
        } catch (err) { }
    };

    return (
        <React.Fragment>
            <div>{error}</div>
            <form className="task-form" onSubmit={taskSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    type="text"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(10)]}
                    errorText="Please enter a valid description at least 10 characters."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Add task
                </Button>
            </form>
        </React.Fragment>
    );
};

export default NewTask;
