import React from "react";

import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import NotFoundPage from "../components/NotFoundPage";
import LandingPage from "../components/Layouts/LandingPage";
import Footer from "../components/Layouts/Footer";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Layouts/Dashboard";
import CreateProfile from "../components/Forms/CreateProfile";
import EditProfile from "../components/Forms/EditProfile";
import AddEducation from "../components/Forms/AddEducation";
import AddExperience from "../components/Forms/AddExperience";
import Developers from "../components/Profiles/Developers";
import DeveloperProfile from "../components/Profiles/DetailedSingleProfile/DeveloperProfile";
import Posts from "../components/Posts/Posts";
import CreatePost from "../components/Forms/CreatePost";
import SinglePost from "../components/Posts/SinglePost";
import PrivateRoute from "./PrivateRoute";

export default () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={LandingPage} exact />

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/createProfile" component={CreateProfile} />
        <PrivateRoute exact path="/editProfile" component={EditProfile} />
        <PrivateRoute exact path="/addEducation" component={AddEducation} />
        <PrivateRoute exact path="/addExperience" component={AddExperience} />
        <Route exact path="/profiles" component={Developers} />
        <Route
          exact
          path="/developerProfile/:handle"
          component={DeveloperProfile}
        />
        <PrivateRoute exact path="/createpost" component={CreatePost} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/singlepost/:id" component={SinglePost} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
