import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import BeatSeq from "./pages/BeatSeq";
import BeatSeqTeaser from "./pages/BeatSeqTeaser";
import Login from "./pages/account/Login";
import SignUp from "./pages/account/SignUp";
import AccountView from "./pages/account/AccountView";
import AccountEdit from "./pages/account/AccountEdit";
import PasswordEdit from "./pages/account/PasswordEdit";
import Logout from "./pages/account/Logout";
import DeleteAccount from "./pages/account/DeleteAccount";
import Info from "./pages/Info";
import NavBar from "./component/NavBar";
const jwt = require("jsonwebtoken");

function App() {
  const [user, setUser] = useState({});
  // const [token, setToken] = useState("")
  console.log("user at App", user);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) {
      const decoded = jwt.verify(token, "sei-26"); //cant read secret :/
      setUser({ userId: decoded.user._id, username: decoded.user.username })
    }
  }, [user.userId])

  return (
    <div class="container-fluid px-0" id="overall-app-cont">
      <Router>
        <NavBar user={user} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/restricted">
            <h1>You are not authorised to visit this page.</h1>
          </Route>
          <Route exact path="/beatseq">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <BeatSeq />}
          </Route>
          <Route path="/beatseq/:id">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <BeatSeq />}
          </Route>
          <Route exact path="/teaser">
            {user.userId === undefined ? <BeatSeqTeaser /> : <Redirect to={"/beatseq"} />}
          </Route>
          <Route exact path="/login">
            {user.userId === undefined ? <Login setUser={setUser} /> : <Redirect to={"/beatseq"} />}
          </Route>
          <Route exact path="/user/new">
            {user.userId === undefined ? <SignUp setUser={setUser} /> : <Redirect to={`/user/${user.userId}`} />}
          </Route>
          <Route exact path="/user/:id">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <AccountView />}
          </Route>
          <Route exact path="/user/:id/edit">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <AccountEdit />}
          </Route>
          <Route exact path="/user/:id/changepassword">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <PasswordEdit />}
          </Route>
          <Route exact path="/user/:id/delete">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <DeleteAccount user={user} setUser={setUser} />}
          </Route>
          <Route exact path="/logout">
            {user.userId === undefined ? <Redirect to={"/login"} /> : <Logout user={user} setUser={setUser} />}
          </Route>
          <Route exact path="/info">
            <Info />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}
export default App;
