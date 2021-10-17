import React, { useCallback } from 'react';
import {
    StyleSheet, 
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hook/Auth';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const { user, signOut } = useAuth();

    const handleSignOut = useCallback(() => {
        signOut();
        navigation.navigate('SignIn');
    }, []);

    function handleTaskList(){
        navigation.navigate('Tasks');
    }

    function handleTaskToday() {
        navigation.navigate('TasksToday');
    }


    return (
        <>
            <StatusBar  translucent style='light' />

            <View style={styles.Container}>
                

                <View style={styles.TopBar}>
                    <Text style={styles.TextTopBar}>Oberon</Text>
                    <TouchableOpacity onPress={handleSignOut}>                        
                        <Feather name='log-out' size={28} color='#FFF' />
                    </TouchableOpacity>
                </View>


                <View style={styles.Content}>

                    <View style={styles.Card}>
                        <Text style={styles.TitleCard} >Tarefas do dia</Text>
                        <Text style={styles.DescriptionCard}>Exibir as tarefas de hoje</Text>
                        <TouchableOpacity style={styles.CardFooter} onPress={handleTaskToday}>
                            <Text style={styles.TextCardFooter}>Visualizar</Text>
                            <Feather name='arrow-right' size={38} color='#FFF' />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.Card}>
                        <Text style={styles.TitleCard} >Suas tarefas</Text>
                        <Text style={styles.DescriptionCard}>Exibir todas as suas tarefas</Text>
                        <TouchableOpacity style={styles.CardFooter} onPress={handleTaskList}>
                            <Text style={styles.TextCardFooter}>Visualizar</Text>
                            <Feather name='arrow-right' size={38} color='#FFF' />
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={styles.BottomBar}>
                    <Text style={styles.TextBottomBar}>{user.name}</Text>
                </View>

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
    BottomBar: {
        backgroundColor: '#2446C0',
        width: '100%',
        height: 60,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextBottomBar: {        
        color: '#FFF',
        fontFamily: 'Roboto_300Light',
        fontSize: 24
    },
    Content: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    Card: {
        width: 320,
        height: 190,
        backgroundColor: '#FFF',
        borderRadius: 10,
        position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 30,
        elevation: 3,
        shadowColor: "black",
        shadowOffset: {
            height: 10,
            width: -5
        },
        shadowRadius: 14
    },
    CardFooter: {
        width: 320,
        height: 60,
        backgroundColor: '#2446C0',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    TextCardFooter: {
        fontFamily: 'Roboto_300Light',
        fontSize: 22,
        marginRight: 5,
        color: '#FFF'
    },
    TitleCard :{
        fontFamily: 'Saira_600SemiBold',
        fontSize: 32,
        marginBottom: 10
    },
    DescriptionCard: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        color: '#A9A9A9'
    }
});


export default Home;