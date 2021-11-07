import React, {useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';
import './TaskForm.css';

const DUMMY_TASKS = [
    {
        id: 't1',
        title: 'new bug 1',
        description: 'new bug 1 new bug 1',
        creator: 'u1'
    },
    {
        id: 't2',
        title: 'new bug 2',
        description: 'new bug 2 new bug 2',
        creator: 'u2'
    },
];

const UpdateTask = () => {
    const [isLoading, setIsLoading] = useState(true);
    const taskId = useParams().taskId;

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

    const identifiedTask = DUMMY_TASKS.find(t => t.id === taskId);

    useEffect(() => {
        setFormData({
            title: {
                value: identifiedTask.title,
                isValid: true
            },
            description: {
                value: identifiedTask.description,
                isValid: true
            }
        }, true);
    setIsLoading(false);
    }, [setFormData, identifiedTask]);

    const taskUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedTask) {
        return (
            <div className="center">
                <h2>task not found!</h2>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading..</h2>
            </div>
        );
    }

    return (
        <form className="task-form" onSubmit={taskUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(10)]}
                errorText="Please enter a valid description (min. 10 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                Update task
            </Button>
        </form>
    );
};

export default UpdateTask;
