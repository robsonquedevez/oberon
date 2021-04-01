import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Enterprise from '../pages/Enterprise';
import RoutePage from '../pages/Route';
import Analytic from '../pages/Analytic';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/user' component={User} />
            <Route path='/enterprise' component={Enterprise} />
            <Route path='/route' component={RoutePage} />
            <Route path='/analytic' component={Analytic} />
        </Switch>
    );
}

export default Routes;