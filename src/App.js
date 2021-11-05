import "./App.css";
import React from "react";

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './users/pages/Users';
import NewTask from "./tasks/pages/NewTask";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

const App = () => {
    return(
    <Router>
        <MainNavigation />
        <main>
            <Switch>
                <Route path="/" exact>
                     <Users />
                </Route>
                <Route path="/tasks/new" exact>
                    <NewTask />
                </Route>
                <Redirect to="/" />
            </Switch>
        </main>
    </Router>
    );
};

export default App;
