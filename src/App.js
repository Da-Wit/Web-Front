import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import {
  Home,
  School,
  Community,
  Club,
  Write,
  Login,
  Join,
  Article,
  Userinfo,
} from "./components";
import Nav from "./components/Nav.js";
import "./App.scss";
import { authService } from "./firebase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div className="container">
      <Userinfo.Provider value={{ isLoggedIn, setLoggedIn, userObj }}>
        <Nav />
        <Route path="/" exact>
          <Home isLoggedIn={isLoggedIn} />
        </Route>
        <Route path="/School" component={School} />
        <Route path="/clubs/:category" exact component={Club} />
        <Route path="/club/:category/:clubname" exact component={Community} />
        <Route path="/write/:category/:clublink" component={Write} />
        <Route
          path="/article/:category/:clubname/:id"
          exact
          component={Article}
        />
        <Route path="/Join" component={Join} />
        <Route path="/Login">
          <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        </Route>
      </Userinfo.Provider>
    </div>
  );
}

export default App;
