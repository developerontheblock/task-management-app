import React, {useState, useCallback} from "react";

import {useParams} from "react-router-dom"; // for dynamic segments like '/:userId'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Users from './users/pages/Users';
import NewTask from "./tasks/pages/NewTask";
import UserTasks from "./tasks/pages/UserTasks";
import UpdateTask from '../src/tasks/pages/UpdateTask';
import Auth from './users/pages/Auth';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import {AuthContext} from "./shared/context/auth-context";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(false);


    const login = useCallback((uid) => {
        setIsLoggedIn(true);
        setUserId(uid);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    let routes;
    if (isLoggedIn) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users/>
                </Route>
                <Route path="/:userId/tasks" exact>
                    <UserTasks/>
                </Route>
                <Route path="/tasks/new" exact>
                    <NewTask/>
                </Route>
                <Route path="/tasks/:taskId">
                    <UpdateTask/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Users/>
                </Route>
                <Route path="/:userId/tasks">
                    <UserTasks/>
                </Route>
                <Route path="/auth" exact>
                    <Auth/>
                </Route>
                <Redirect to="/auth"/>
            </Switch>
        );
    }

    return (
        // when isLoggedIn changes this new value will be passed out to all the components that are interested
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login: login, logout: logout}}>
            <Router>
                <MainNavigation/>
                <main> {routes} </main>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
