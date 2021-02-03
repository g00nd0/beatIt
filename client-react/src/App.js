import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
// import { useState, useEffect } from "react";
import Home from './pages/Home'
import BeatSeq from './pages/BeatSeq'

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </ Route>
                    <Route exact path="/beatseq/:id">
                        <BeatSeq />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
export default App;


{/*<div>
            <NavBar loggedIn={loggedIn} />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/user/new">
                        <SignUp setLoggedIn={setLoggedIn} />
                    </Route>
                    <Route exact path="/login">
                        <Login setLoggedIn={setLoggedIn} />
                    </Route>
                    <Route exact path="/logout">
                        <Logout setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
                    </Route>
                    <Route exact path="/user/:id">
                        {userId ? <Account /> : <Redirect to={"/login"} />}
                    </Route>
                    <Route exact path="/user/:id/edit">
                        <AccountEdit />
                    </Route>
                    <Route exact path="/user/:id/changepassword">
                        {userId ? <PasswordEdit /> : <Redirect to={"/login"} />}
                    </Route>
                    <Route exact path="/user/:id/delete">
                        {userId ? (
                            <DeleteAccount setLoggedIn={setLoggedIn} />
                        ) : (
                                <Redirect to={"/login"} />
                            )}
                    </Route>
                    <Route exact path="/beatseq/:id">
                        <BeatSeq />
                    </Route>
                    <Route exact path="/info">
                        <Info />
                    </Route>
                    <Route exact path="/drumkit">
                        <DrumKit />
                    </Route>
                </Switch>
            </Router>
        </div> */}