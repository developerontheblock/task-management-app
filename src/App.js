import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './users/pages/Users';
import NewTask from "./tasks/pages/NewTask";

const App = () => {
    return(
    <Router>
        <Switch>
            <Route path="/" exact>
                 <Users />
            </Route>
            <Route path="/tasks/new" exact>
                <NewTask />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Router>
    );
};

export default App;
