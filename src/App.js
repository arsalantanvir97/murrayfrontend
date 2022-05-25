import React, { Profiler } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import ChangePassword from "./Screens/ChangePassword";
import Customers from "./Screens/Customers";
import Dashboard from "./Screens/Dashboard";
import Invoice from "./Screens/Invoice";
import Login from "./Screens/Login";
import Notifications from "./Screens/Notifications";
import Profile from "./Screens/Profile";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Login} exact />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/notifications" component={Notifications} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />
      <PrivateRoute exact path="/Customers" component={Customers} />
      <PrivateRoute exact path="/Invoice" component={Invoice} />

    </Router>
  );
};

export default App;
