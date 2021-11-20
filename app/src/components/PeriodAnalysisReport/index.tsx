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
    Slide,
    Dialog,
    AppBar,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import {
    Close,
    Check    
} from '@material-ui/icons';
import { 
    format, 
    differenceInSeconds ,
    fromUnixTime,
    addDays
} from 'date-fns';

import Map from '../Map';

import {
    Container
} from './styles';

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
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
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

interface IPeriodAnalysisReport {
    task: ITask;
    executing_user?: string | null;
    startDate: string;
    endDate: string;
}

const PeriodAnalysisReport: React.FC<IPeriodAnalysisReport> = ({ task, executing_user, startDate, endDate }) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);

    const [concludedMarker, setConcludedMarker] = useState<number>(0);
    const [totalMarkers, setTotalMarkers] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const typeTask = ['Ronda', 'Quadrante', 'Ponto de Chegada'];

    useEffect(() => {

        console.log(task);

        const concluded = task.executing[0].markers.filter(marker => marker.concluded === true);

        const seconds = differenceInSeconds(
            fromUnixTime(task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp),
            fromUnixTime(task.executing[0].coordinates[0].timestamp)
        ); 
        
        setConcludedMarker(concluded.length);
        setTotalMarkers(task.executing[0].markers.length);
        setHours(seconds / 3600);
        setMinutes(seconds / 60);
        setSeconds(seconds % 60);


    }, [task]);

    const handleCloseDialog = useCallback(() => {
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
                            <TableCell>Periodo:  
                                {format( addDays(new Date(startDate), 1), 'dd/MM/yyyy')}
                                a 
                                {format( addDays(new Date(endDate), 1), 'dd/MM/yyyy')}
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
                        </TableRow>
                        <TableRow>
                            <TableCell>Pontos Concluídos</TableCell>
                            <TableCell>{concludedMarker} / {totalMarkers}</TableCell>
                        </TableRow>
                    </TableBody>


                </Table>
            </TableContainer>

            <Dialog
                fullScreen
                open={open}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar>
                    <h3>Tarefa: {task.task.title}</h3>
                </AppBar>

                <Map
                    
                />

            </Dialog>

        </Container>
    );

}

export default PeriodAnalysisReport;