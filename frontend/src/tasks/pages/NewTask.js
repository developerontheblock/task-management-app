import React from 'react';

import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import {useForm} from '../../shared/hooks/form-hook';
import './TaskForm.css';


const NewTask = () => {
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false)


    const taskSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    };
    return (
        <form className="task-form" onSubmit={taskSubmitHandler}>
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
    );
};

export default NewTask;
