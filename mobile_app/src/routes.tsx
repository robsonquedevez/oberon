import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import ExecutingTask from "./pages/ExecutingTask";
import SignIn from "./pages/SignIn";
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TaskListToday from './pages/TaskListToday';

const Routes: React.FC = () => {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} initialRouteName='SignIn' >
                <Screen name="SignIn" component={SignIn} />
                <Screen name="Home" component={Home} />
                <Screen name="Tasks" component={TaskList} />
                <Screen name="TasksToday" component={TaskListToday} />
                <Screen name="ExecutingTask" component={ExecutingTask}/>
            </Navigator>
        </NavigationContainer>        
    );
}

export default Routes;