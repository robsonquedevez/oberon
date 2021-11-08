import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    Alert
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";

import markerIcon from '../assets/Marker.png';
import markerUserIcon from '../assets/Person.png';
import markerSuccess from '../assets/MarkerSuccess.png';
import api from "../services/api";

interface IRouteParams {
    task: string;
}

interface ITask {    
    task: {
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
    },
    coordinates: [
        {
            id: string;
            name: string;
            latitude: number;
            longitude: number;
        }
    ]
}

interface Task {
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

interface Coordinate {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    concluded: boolean;
    datetime: number;
}

interface IPosition {
    latitude: number;
    longitude: number;
    timestamp: number;
}

const ExecutingTask: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [idTask, setIdTask] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [task, setTask] = useState<Task>();
    const [coordinates, setCoordinates] = useState<Coordinate[]>();
    const [currentPosition, setCurrentPosition] = useState<IPosition>();
    const [executing, setExecuting] = useState<IPosition[]>();

    const abortControl = new AbortController();

    useEffect(() => {
        (
            async () => {
                const { task } = route.params as IRouteParams;

                setIdTask(task);

                const response = await api.get(`/task/${task}`);

                if(!response) {
                    abortControl.abort()
                    navigation.goBack();
                    Alert.alert('Tarefa', 'Erro ao tentar carregar tarefa');
                }

                const executingTask = response.data as ITask;

                setTask(executingTask.task);

                let createArrayCoordinates: Coordinate[] = [];
        
                executingTask.coordinates.map(coord => {
                    createArrayCoordinates.push({ 
                        id: coord.id,
                        name: coord.name,
                        latitude: coord.latitude,  
                        longitude: coord.longitude,
                        concluded: false,
                        datetime: 0
                    })  
                }); 

                setCoordinates(createArrayCoordinates);

                const { status } = await Location.requestForegroundPermissionsAsync();

                if(status !== 'granted') {
                    Alert.alert('Localização', 'Localização atual não liberada');
                    abortControl.abort();
                    return;
                }

                const location = await Location.getCurrentPositionAsync();    

                setCurrentPosition({ 
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    timestamp: location.timestamp,
                });

                setLoading(false);
            }
        )()
    }, []);

    function checkedMarker(latitude: number, longitude: number, timestamp: number): void {

        coordinates?.map(coord => {
            if(
                coord.latitude.toFixed(4) === latitude.toFixed(4) && 
                coord.longitude.toFixed(4) === longitude.toFixed(4) &&
                coord.concluded === false
                )
                {
                    coord.concluded = true;
                    coord.datetime = timestamp;
                    console.log('checked: ', latitude.toFixed(6), longitude.toFixed(6), coord.id);
            }
        });
    }

    function storageCurrentPosition({ latitude, longitude, timestamp }:IPosition): void {

        if(!executing)  {
            setExecuting([{
                latitude,
                longitude,
                timestamp
            }])
            return;
        }

        let execLat = executing[executing?.length - 1].latitude;
        let execLng = executing[executing?.length - 1].longitude;

        if(
            latitude.toFixed(5) !== execLat.toFixed(5) && 
            longitude.toFixed(5) !== execLng.toFixed(5)
        ) 
        {  
            console.log('move: ', latitude.toFixed(5), longitude.toFixed(5));

            let data = {
                latitude,
                longitude,
                timestamp
            }

            setExecuting([...executing, data]);
            checkedMarker(latitude, longitude, timestamp);
        }
    }


    async function handleFinishedTask() {
        
        console.log('Finished');
       
        api.post('/task/executing', { 
            id: idTask,  
            coordinates: executing,
            markers: coordinates
        })
        .then(response => {
            console.log(response.data);
            navigation.goBack();
        })
        .catch(error => {
            console.log(error);
            Alert.alert('Erro', 'Erro ao finalizar tarefa');
            navigation.goBack();
        })
        .finally(() => {
            console.log('goback');
            navigation.goBack();
        })
    }
    
    return (
        <>
            <StatusBar translucent style='dark' />
            
            <View style={styles.container}>
                <View style={styles.TopBar}>
                   
                    <Text style={styles.TextTopBar}>Oberon</Text>
                    {
                        loading ? <View /> :
                        <TouchableOpacity style={styles.ButtonStop} onPress={handleFinishedTask}>
                            <Text style={styles.TextButtonStop} >Encerrar</Text>                                          
                            <Feather name='stop-circle' size={28} color='#C7173B' />
                        </TouchableOpacity>
                       
                    }
                </View>

                {
                    !loading && !!currentPosition
                    ?
                    <MapView                        
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: currentPosition.latitude,
                            longitude: currentPosition.longitude,
                            latitudeDelta: 0.0055,
                            longitudeDelta: 0.0055,
                        }}
                        showsUserLocation
                        followsUserLocation
                        onUserLocationChange={(e) => {                           
                            storageCurrentPosition({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude,
                                timestamp: e.nativeEvent.coordinate.timestamp
                            })                            
                        }}                        
                    >
                        {
                            task?.type !== 2 
                            ?
                                coordinates?.map(coord => (
                                    <Marker
                                        key={coord.id}
                                        icon={ coord.concluded ? markerSuccess : markerIcon}
                                        coordinate={{
                                            latitude: coord.latitude,
                                            longitude: coord.longitude,
                                        }}
                                        
                                    />
                                ))   
                            :   
                            null

                        }

                    </MapView>
                    :
                    <View  style={styles.Loading}>
                        <ActivityIndicator size='large' color='#2446C0'/>
                        <Text style={styles.TextLoading}>Carregando...</Text>
                    </View>
                }

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    TopBar: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingHorizontal: 20
    },
    TextTopBar: {
        color: '#2446C0',
        fontFamily: 'Saira_600SemiBold',
        fontSize: 28
    },
    ButtonStop: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#FE8099',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 7,
    },
    TextButtonStop: {
        color: '#C7173B',
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        marginRight: 5,
    },
    Loading: {
        flex: 1,
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextLoading: {
        color: '#A9A9A9',
        fontFamily: 'Roboto_700Bold',
    }

});

export default ExecutingTask;