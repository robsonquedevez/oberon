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
    OpenInNew,
    ErrorOutline,
    ReportProblemOutlined,
    VerifiedUserOutlined,    
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
        alignItems: 'center',        
    },
    paddingCell: {
        paddingTop: 6,
        paddingBottom: 6,
    },
    iconCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-arrow',
        width: '100%',
    },
    iconWarning: {
        color: '#ffc107',
    },
    iconError: {
        color: '#f44336',
    },
    iconSuccess: {
        color: '#4caf50',
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
    const [cover, setCover] = useState<number>(0);
    const [estimatedHours, setEstimatedHours] = useState<number>(0);
    const [estimatedMinutes, setEstimatedMinutes] = useState<number>(0);
    const [estimatedSeconds, setEstimatedSeconds] = useState<number>(0);
    const [percentageOfTime, setPercentageOfTime] = useState<number>(0);

    const typeTask = ['Ronda', 'Quadrante', 'Ponto de Chegada'];

    useEffect(() => {  
        const concluded = task.executing[0].markers.filter(marker => marker.concluded === true);

        const time = differenceInSeconds(
            fromUnixTime(
                task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp),
            fromUnixTime(task.executing[0].coordinates[0].timestamp)
        ); 

        const estimatedTime = differenceInSeconds(
            new Date(task.task.end_task),
            new Date(task.task.start_task)
        ); 
        
        setConcludedMarker(concluded.length);
        setTotalMarkers(task.executing[0].markers.length);
        setHours(time / 3600);
        setMinutes(Math.trunc((time % 3600) / 60));
        setSeconds((time % 60));
        setStartTask(task.executing[0].coordinates[0].timestamp);
        setEndTask(task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp)
        setCover(Math.trunc(((concluded.length/task.executing[0].markers.length) * 100)));
        setEstimatedHours(estimatedTime / 3600);
        setEstimatedMinutes(Math.trunc((estimatedTime % 3600) / 60));
        setEstimatedSeconds(estimatedTime % 60);
        setPercentageOfTime(Math.trunc((time / estimatedTime) * 100));        

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
                            <TableCell>
                                Data: {format( addDays(new Date(date), 1), 'dd/MM/yyyy')}
                            </TableCell>
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
                            <TableCell>Validado</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            task.executing[0].markers.map(marker => (
                                <TableRow key={marker.id}>
                                    <TableCell 
                                        className={classes.paddingCell}
                                    >
                                        {marker.name ? marker.name : marker.id}
                                    </TableCell>
                                    <TableCell 
                                        className={classes.paddingCell}
                                    >
                                        {marker.latitude.toFixed(10)}
                                    </TableCell>
                                    <TableCell 
                                        className={classes.paddingCell}
                                    >
                                        {marker.longitude.toFixed(10)}
                                    </TableCell>
                                    <TableCell align='center' className={classes.paddingCell}>
                                        { marker.datetime === 0 
                                            ? '-' 
                                            : format(fromUnixTime(marker.datetime), 'HH:mm:ss') }
                                    </TableCell>
                                    <TableCell align='center' className={classes.paddingCell}>
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
                            <TableCell className={classes.paddingCell}>Tempo Estimado</TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                {estimatedHours.toFixed(0)}h {estimatedMinutes.toFixed(0)}m {estimatedSeconds.toFixed(0)}s 
                            </TableCell>
                            <TableCell className={classes.paddingCell}>Tempo de Execução</TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                {hours.toFixed(0)}h {minutes.toFixed(0)}m {seconds.toFixed(0)}s
                            </TableCell>
                            <TableCell className={classes.paddingCell}>{percentageOfTime}%</TableCell>
                        </TableRow>
                        <TableRow>                            
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                Início { typeTask[task.task.type -1] }
                            </TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                {format(fromUnixTime(startTask), 'HH:mm:ss') }
                            </TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                Fim { typeTask[task.task.type -1] }
                            </TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                {format(fromUnixTime(endTask), 'HH:mm:ss') }
                            </TableCell>
                            <TableCell/>
                        </TableRow>
                        <TableRow>
                        <TableCell 
                                className={classes.paddingCell}
                            >
                                Pontos Validados
                            </TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                {concludedMarker} / {totalMarkers}
                            </TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >
                                Cobertura do Pontos
                            </TableCell>
                            <TableCell 
                                className={classes.paddingCell}
                            >   
                                <div className={classes.iconCell} >
                                    { cover }% 
                                    { 
                                        cover < 60 
                                        ? 
                                            <Tooltip title='Percentual de cobertura baixo'>
                                                <ErrorOutline className={classes.iconError} />
                                            </Tooltip>
                                        :
                                        cover < 85
                                        ?
                                            <Tooltip title='Percentual de cobertura médio'>
                                                <ReportProblemOutlined  className={classes.iconWarning} />
                                            </Tooltip>
                                        :
                                            <Tooltip title='Percentual de cobertura Alto'>
                                                <VerifiedUserOutlined  className={classes.iconSuccess} />
                                            </Tooltip>
                                    }
                                </div>
                            </TableCell>
                            <TableCell/>
                        
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