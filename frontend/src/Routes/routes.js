import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from '../Pages/Logon'
import Profile from '../Pages/Profile'
import Register from '../Pages/Register'
import NewIncident from '../Pages/NewIncident'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/incidents/new' component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

