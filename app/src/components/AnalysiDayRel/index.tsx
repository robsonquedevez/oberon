import React, { useEffect, useState } from 'react';
import {
    Paper,
    makeStyles,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody
} from '@material-ui/core';
import {
    Search as SearchIcon,
    Close,
    Check,
    OpenInNew
} from '@material-ui/icons';
import { 
    format, 
    differenceInHours, 
    differenceInMinutes, 
    differenceInSeconds ,
    fromUnixTime
} from 'date-fns';

import {

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
    }
}));

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

interface IAnalysisDayRel {
    task: ITask;
}


const AnalysisDayRel: React.FC<IAnalysisDayRel> = ({ task }) => {
    const classes = useStyles();

    const [concludedMarker, setConcludedMarker] = useState<number>(0);
    const [totalMarkers, setTotalMarkers] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {

        console.log(task);

        const concluded = task.executing[0].markers.filter(marker => marker.concluded === true);
        const hours = differenceInHours(
            fromUnixTime(task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp),
            fromUnixTime(task.executing[0].coordinates[0].timestamp)
        ); 
        const minutes = differenceInMinutes(
            fromUnixTime(task.executing[0].coordinates[task.executing[0].coordinates.length - 1].timestamp),
            fromUnixTime(task.executing[0].coordinates[0].timestamp)
        );  
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


    return (
        <TableContainer component={Paper} className={classes.container}>

            <Table>
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

    );

}

export default AnalysisDayRel;