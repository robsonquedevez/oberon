import React, { useCallback, useEffect, useState } from 'react';
import {
    Paper,
    makeStyles,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Tooltip,
    IconButton,
    Dialog,
    Slide,
    AppBar,
    Toolbar
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import {
    Close,
    Check,
    OpenInNew 
} from '@material-ui/icons';
import { 
    format, 
    differenceInSeconds ,
    fromUnixTime, 
    addDays
} from 'date-fns';
import { Marker, Popup, Polyline } from '@monsonjeremy/react-leaflet';
import * as L from 'leaflet';

import Map from '../Map';

import MarkerSuccess from '../../assets/images/MarkerSuccess.svg';
import MarkerFail from '../../assets/images/MarkerFail.svg';

import {
    Container
} from './styles';

const lineOptions = { color: 'blue' };

const MakerFailIcon = L.icon({
    iconUrl: MarkerFail,
    iconSize: [25, 25],
});

const MakerSuccessIcon = L.icon({
    iconUrl: MarkerSuccess,
    iconSize: [25, 25],
});

const useStyles = makeStyles((theme) => ({    
    iconChecked: {
        color: '#00e676'
    },
    iconNotChecked: {
        color: '#ff3d00'
    },
    container: {
        width: '100%'
    },
    resume: {
        marginTop: 10,
    },
    appBar: {
        position: 'relative',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-arrow',
        alignItems: 'center'
    }
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  }); 

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
            latitude: number;
            longitude: number;
        }
    ],
    executing: [
        {
            data: string;
            coordinates: [{
                latitude: number;
                longitude: number;
                timestamp: number;
            }],
            markers:  [{
                id: string;
                name: string;
                latitude: number;
                longitude: number;
                concluded: boolean;
                datetime: number;
            }] 
        }
    ]
}

interface IDailyAnalysisReport {
    task: ITask;
    executing_user?: string | null;
    date: string;
}

const DailyAnalysisReport: React.FC<IDailyAnalysisReport> = ({ task, executing_user, date }) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    const [concludedMarker, setConcludedMarker] = useState<number>(0);
    const [totalMarkers, setTotalMarkers] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [startTask, setStartTask] = useState<number>(0);
    const [endTask, setEndTask] = useState<number>(0);

    const typeTask = ['Ronda', 'Quadrante', 'Ponto de Chegada'];

    useEffect(() => {

        const concluded = task.executing[0].markers.filter(marker => marker.concluded === true);

        const seconds = differenceInSeconds(
            fromUnixTime(task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp),
            fromUnixTime(task.executing[0].coordinates[0].timestamp)
        ); 
        
        setConcludedMarker(concluded.length);
        setTotalMarkers(task.executing[0].markers.length);
        setHours(seconds / 3600);
        setMinutes(Math.trunc(seconds / 60));
        setSeconds((seconds % 60));
        setStartTask(task.executing[0].coordinates[0].timestamp);
        setEndTask(task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp)

    }, [task]);

    const handleShowDialog = useCallback(() => {
        setOpen(!open);
    }, [open]);

    return (
        <Container>
            <TableContainer component={Paper} className={classes.container}>

                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Tarefa: {task.task.title}</TableCell>
                            <TableCell>Tipo: {typeTask[task.task.type - 1]}</TableCell>
                            <TableCell>Usuário: {executing_user}</TableCell>
                            <TableCell>Data: {format( addDays(new Date(date), 1), 'dd/MM/yyyy')}</TableCell>
                            <TableCell>
                                <Tooltip title='Ver no mapa'>
                                    <IconButton aria-label='Abrir mapa' onClick={handleShowDialog}>
                                        <OpenInNew />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell align='center'>Hora</TableCell>
                            <TableCell>Concluído </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            task.executing[0].markers.map(marker => (
                                <TableRow key={marker.id}>
                                    <TableCell>{marker.name ? marker.name : marker.id}</TableCell>
                                    <TableCell>{marker.latitude}</TableCell>
                                    <TableCell>{marker.longitude}</TableCell>
                                    <TableCell align='center'>
                                        { marker.datetime === 0 
                                            ? '-' 
                                            : format(fromUnixTime(marker.datetime), 'HH:mm:ss') }
                                    </TableCell>
                                    <TableCell align='center'>
                                        { 
                                            marker.concluded 
                                            ? <Check className={classes.iconChecked} /> 
                                            : <Close className={classes.iconNotChecked} /> 
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>

                    <TableHead>
                        <TableRow>
                            <TableCell>Resumo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        <TableRow>
                            <TableCell>Tempo de execução</TableCell>
                            <TableCell>{hours.toFixed(0)}h {minutes.toFixed(0)}m {seconds.toFixed(0)}s</TableCell>
                            <TableCell>Início { typeTask[task.task.type -1] }</TableCell>
                            <TableCell>{format(fromUnixTime(startTask), 'HH:mm:ss') }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Pontos Concluídos</TableCell>
                            <TableCell>{concludedMarker} / {totalMarkers}</TableCell>
                            <TableCell>Fim { typeTask[task.task.type -1] }</TableCell>
                            <TableCell>{format(fromUnixTime(endTask), 'HH:mm:ss') }</TableCell>
                        </TableRow>
                    </TableBody>


                </Table>
            </TableContainer>

            <Dialog
                fullScreen
                open={open}
                onClose={handleShowDialog}
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton edge="start" color="inherit" onClick={handleShowDialog} aria-label="close">
                            <Close />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Map
                    initialPosition={
                        [
                            task.executing[0].markers[0].latitude,
                            task.executing[0].markers[0].longitude
                        ]
                    }
                >
                    {
                        task.executing[0].markers.map(marker => (
                            <Marker
                                position={L.latLng(marker.latitude, marker.longitude)}
                                icon={marker.concluded === true ? MakerSuccessIcon : MakerFailIcon}      
                            >
                                <Popup>
                                    <p>{marker.name}</p>
                                </Popup>
                            </Marker>
                        ))
                    }
                    {
                        <Polyline
                            pathOptions={lineOptions}
                            positions={
                                task.executing[0].coordinates.map(coord => { return [ coord.latitude, coord.longitude ] })
                            }
                        />
                    }
                </Map>

            </Dialog>

        </Container>
    );

}

export default DailyAnalysisReport;