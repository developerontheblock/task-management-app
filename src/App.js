import "./App.css";
import React from "react";

import {useParams} from "react-router-dom"; // for dynamic segments like '/:userId'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './users/pages/Users';
import NewTask from "./tasks/pages/NewTask";
import UserTasks from "./tasks/pages/UserTasks";
import Auth from './users/pages/Auth';
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
                <Route path="/:userId/tasks">
                    <UserTasks />
                </Route>
                <Route path="/tasks/new" exact>
                    <NewTask />
                </Route>
                <Route path="/auth" exact>
                    <Auth />
                </Route>
                <Redirect to="/" />
            </Switch>
        </main>
    </Router>
    );
};

export default App;
