import React, { useCallback, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import AppLoading from 'expo-app-loading';

import { useAuth } from '../hook/Auth';
import api from '../services/api';

interface ITask {
    id: string;
    title: string;
    created_at: string;
    days_of_the_week: string;
    start_task: Date;
    end_task: Date;
    enterprise: string;
    executing_user: string;
    finished: boolean;
    repeat: boolean;
    status_task: number;
    type: number;
}

const TaskList: React.FC = () => {
    const navigation = useNavigation();
    const { user, signOut, token } = useAuth();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const types = ['Ronda', 'Quadrante', 'Ponto de chegada'];
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                api.get(`/task/user/today/${user.id}`)
                .then(response => {
                    setTasks(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error.data);
                    setLoading(false);
                })                
            }
        )()
    }, []);

    const handleSignOut = useCallback(() => {
        signOut();
        navigation.navigate('SignIn');
    }, []);

    function handleGoBack(){
        navigation.goBack();
    }

    function handleTaskPlay(task: string){
        navigation.navigate('ExecutingTask', { task });
    }


    return (
        <>
            <StatusBar  translucent style='light' />

            <View style={styles.Container}>
                <View style={styles.TopBar}>
                    <TouchableOpacity onPress={handleGoBack}>                        
                        <Feather name='arrow-left' size={28} color='#FFF' />
                    </TouchableOpacity>
                    <Text style={styles.TextTopBar}>Oberon</Text>
                    <TouchableOpacity onPress={handleSignOut}>                        
                        <Feather name='log-out' size={28} color='#FFF' />
                    </TouchableOpacity>
                </View>

                {
                    loading 
                    ? 
                    <View  style={styles.Loading}>
                        <ActivityIndicator size='large' color='#2446C0'/>
                    </View>
                    :
                    <FlatList
                        data={tasks}
                        keyExtractor={(tasks => tasks.id)}
                        renderItem={({item}) => (
                            <View style={styles.ListItem}>
                                    <View>
                                        <Text style={styles.TaskTitle}>{item.title}</Text>
                                        <Text style={styles.TaskDate}>Início: { format(new Date(item.start_task), 'dd/MM/yyyy HH:mm')}</Text>
                                        <Text style={styles.TaskType}>Tipo: {types[item.type - 1]}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.ButtonPlay} onPress={() => handleTaskPlay(item.id)}>
                                        <Text style={styles.TextButtonPlay} >Iniciar</Text>
                                        <Feather name='play' size={28} color='#1A6D22' />
                                    </TouchableOpacity>
                                </View>
                        )}
                    />
                }                

            </View>
        </>
    );
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: '#EAEAEA',
        justifyContent: 'space-between'
    },
    TopBar: {
        backgroundColor: '#2446C0',
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 20
    },
    TextTopBar: {
        color: '#FFF',
        fontFamily: 'Saira_600SemiBold',
        fontSize: 28
    },
    ListItem: {
        backgroundColor: '#FFF',
        borderBottomColor: '#939393',
        width: '100%',
        height: 90,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
        marginBottom: 2,
    },
    ButtonPlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#33BD41',
        borderRadius: 10,
    },
    TextButtonPlay: {
        color: '#1A6D22',
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        marginRight: 5
    },
    TaskTitle :{
        color: '#000',
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        marginRight: 5
    },
    TaskDate: {
        color: '#A9A9A9',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        marginRight: 5
    },
    TaskType: {
        color: '#A9A9A9',
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        marginRight: 5
    },
    Loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TaskList;