import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import NewIncident from '../pages/NewIncident'
import EditProfile from '../pages/EditProfile'
import Feed from '../pages/Incidents'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/feed/" component={Feed} />
                <Route path="/incidents/new" component={NewIncident} />
                <Route path="/edit" component={EditProfile} />

            </Switch>
        </BrowserRouter>
    );
}