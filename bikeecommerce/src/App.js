import React from 'react';
import { Switch, Route } from "react-router-dom"; 
import routes from "./routes/routes"
import './App.css';
import Landingpage from "./pages/landingPage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Allproducts from "./pages/allproducts";
import Eachproduct from "./pages/eachDisplay";
import Payment from "./pages/payment";
import NavBar from "./commonComponents/Navbar";
import Logout from "./pages/logout";

import Footersection from "./commonComponents/Footer"


function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="">
        <div className="container-fluid" style={{minHeight:"78vh"}}>
          <Switch>
            <Route exact path={routes.landingpage}>
              <Landingpage />
            </Route>
            <Route exact path={routes.login}>
              <Login />
            </Route>
            <Route exact path={routes.signup}>
              <Signup />
            </Route>
            <Route exact path={routes.eachproduct}>
              <Eachproduct />
            </Route>
            <Route exact path={routes.payment}>
              <Payment />
            </Route>
            <Route exact path={routes.allproducts}>
              <Allproducts />
            </Route>
            <Route path={routes.logout}>
              <Logout/>
            </Route>
          </Switch>
        </div>
      </main> 
      <Footersection />
    </div>
  );
}

export default App;
