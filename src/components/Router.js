import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Todo from 'routes/Todo';
import Write from 'routes/Write';
import Blogs from 'routes/Blogs';
import Navigation from 'components/Navigation';

function BlogRouter({ userObj, isLoggedIn, refreshUser }) {
    return(
        <Router>
            { isLoggedIn && <Navigation/> }
            <Switch>
                { isLoggedIn ? (
                    <>
                        <Route exact path = "/">
                            <Home userObj = {userObj} refreshUser = {refreshUser}/>
                        </Route>
                        <Route exact path = "/profile">
                            <Profile userObj = {userObj} refreshUser = {refreshUser}/>
                        </Route>
                        <Route exact path = "/todo">
                            <Todo />
                        </Route>
                        <Route exact path = '/write'>
                            <Write userObj = {userObj}/>
                        </Route>
                        <Route exact path = '/allblog'>
                            <Blogs />
                        </Route>
                    </> 
                ) : (
                    <Route exact path = "/">
                        <Auth />
                    </Route>
                )}  
            </Switch>
        </Router>
    );
}

export default BlogRouter;