import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loader from "./Components/Loader";
import PrivateRoute from "./Components/PrivateRoute";
const ChangePassword = lazy(() => import("./Screens/ChangePassword"));
const Customers = lazy(() => import("./Screens/Customers"));
const Dashboard = lazy(() => import("./Screens/Dashboard"));
const Invoice = lazy(() => import("./Screens/Invoice"));
const Login = lazy(() => import("./Screens/Login"));
const Notifications = lazy(() => import("./Screens/Notifications"));
const Profile = lazy(() => import("./Screens/Profile"));
const InvoiceDetails = lazy(() => import("./Screens/InvoiceDetails"));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router basename="/murrayservices">
        <Route path="/" component={Login} exact />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/notifications" component={Notifications} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/ChangePassword" component={ChangePassword} />
        <PrivateRoute exact path="/Customers" component={Customers} />
        <PrivateRoute exact path="/Invoice" component={Invoice} />
        <Route exact path="/InvoiceDetails/:id" component={InvoiceDetails} />
      </Router>
    </Suspense>
  );
};

export default App;
