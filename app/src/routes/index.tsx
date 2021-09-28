import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Forgot from '../pages/Forgot';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Enterprise from '../pages/Enterprise';
import User from '../pages/User';
import Task from '../pages/Task';
import Analysis from '../pages/Analysis';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/forgot-pass' component={Forgot} />
            <Route path='/register' component={Register} />
            <Route path='/home' component={Home} isPrivate/>
            <Route path='/enterprise' component={Enterprise} isPrivate/>
            <Route path='/user' component={User} isPrivate/>
            <Route path='/task' component={Task} isPrivate/>
            <Route path='/analysis' component={Analysis} isPrivate/>
        </Switch>
    )
}

export default Routes;