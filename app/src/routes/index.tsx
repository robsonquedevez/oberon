import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Enterprise from '../pages/Enterprise';
import User from '../pages/User';
import Task from '../pages/Task';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/forgot-pass' component={Forgot} />
            <Route path='/register' component={Register} />
            <Route path='/home' component={Home} />
            <Route path='/enterprise' component={Enterprise} />
            <Route path='/user' component={User} />
            <Route path='/task' component={Task} />
        </Switch>
    )
}

export default Routes;