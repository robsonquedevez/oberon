import React, { useEffect, useState } from 'react';
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

} from '@material-ui/core';
import {
    ArrowDownward,
    ArrowUpward,
    ErrorOutline,
    ReportProblemOutlined,
    VerifiedUserOutlined
} from '@material-ui/icons';
import { 
    format, 
    differenceInSeconds ,
    fromUnixTime,
    addDays
} from 'date-fns';

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
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    iconWarning: {
        color: '#ffc107',
    },
    iconError: {
        color: '#f44336',
    },
    iconSuccess: {
        color: '#4caf50',
    },
    iconCell: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-arrow',
        width: '100%',
    },
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

interface IResults {
    date: string;
    concludedMarker: number;
    totalMarkers: number;
    hours: number;
    minutes: number;
    seconds: number;
    cover: number;
    startTask: number;
    endTask: number;
    historic: boolean | null;
}

interface IPeriodAnalysisReport {
    task: ITask;
    executing_user?: string | null;
    startDate: string;
    endDate: string;
}

const PeriodAnalysisReport: React.FC<IPeriodAnalysisReport> = ({ task, executing_user, startDate, endDate }) => {
    const classes = useStyles();
    const [results, setResults] = useState<IResults[]>([]);
    const typeTask = ['Ronda', 'Quadrante', 'Ponto de Chegada'];

    useEffect(() => {

        const response: IResults[] = [];

        task.executing.map(running => {
            const date = running.data;
            const concludedMarker = running.markers.filter(marker => marker.concluded === true).length;
            const totalMarkers = running.markers.length;
            const time = differenceInSeconds(
                fromUnixTime(running.coordinates[running.coordinates.length - 1].timestamp),
                fromUnixTime(running.coordinates[0].timestamp)
            ); 
            const hours = Math.trunc(time / 3600);
            const minutes = Math.trunc((time % 3600) / 60);
            const seconds = (time % 60);
            const cover = Math.trunc((concludedMarker/totalMarkers) * 100);
            const startTask = running.coordinates[0].timestamp;
            const endTask = running.coordinates[running.coordinates.length - 1].timestamp;
            const historic = response.length < 1 ? null : response[response.length - 1].concludedMarker < concludedMarker ? true : false;
            
            console.log(response.length);

            const data = {
                date, 
                concludedMarker, 
                totalMarkers, 
                hours, 
                minutes, 
                seconds, 
                cover, 
                startTask, 
                endTask,
                historic
            };

            console.log(data);

            response.push(data);
        });

        setResults(response);

    }, [task]);

    return (    
        
        <Container>
            <TableContainer component={Paper} className={classes.container}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tarefa: {task.task.title}</TableCell>
                            <TableCell>Tipo: {typeTask[task.task.type - 1]}</TableCell>
                            <TableCell>Usuário: {executing_user}</TableCell>
                            <TableCell colSpan={4} >
                                Periodo: {format( addDays(new Date(startDate), 1), 'dd/MM/yyyy')} a {format( addDays(new Date(endDate), 1), 'dd/MM/yyyy')}
                            </TableCell>
                        </TableRow>
                    </TableHead>


                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Validados</TableCell>
                            <TableCell>Cobertura</TableCell>
                            <TableCell>Tempo</TableCell>
                            <TableCell>Início </TableCell>
                            <TableCell>Fim </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            results.map(result => (
                                <TableRow key={result.date}>
                                    <TableCell>{format( addDays(new Date(result.date), 1), 'dd/MM/yyyy')}</TableCell>
                                    <TableCell>
                                        <div className={classes.iconCell}>
                                            {result.concludedMarker} / {result.totalMarkers}
                                            {   
                                                result.historic === null ?
                                                    null
                                                :
                                                result.historic ?
                                                <Tooltip title='Número de pontos validados aumentou'>
                                                    <ArrowUpward className={classes.iconSuccess} />
                                                </Tooltip>
                                                : 
                                                <Tooltip title='Número de pontos validados diminuiu'>
                                                    <ArrowDownward className={classes.iconError}/>
                                                </Tooltip>
                                                
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>{result.cover}%</TableCell>
                                    <TableCell>{result.hours}h {result.minutes}m {result.seconds}s</TableCell>
                                    <TableCell>{format(fromUnixTime(result.startTask), 'HH:mm:ss') }</TableCell>                                
                                    <TableCell>{format(fromUnixTime(result.endTask), 'HH:mm:ss') }</TableCell>                                
                                    <TableCell> 
                                        { 
                                            result.cover < 60 
                                            ? 
                                                <Tooltip title='Percentual de cobertura baixo'>
                                                    <ErrorOutline className={classes.iconError} />
                                                </Tooltip>
                                            :
                                            result.cover < 85
                                            ?
                                                <Tooltip title='Percentual de cobertura médio'>
                                                    <ReportProblemOutlined  className={classes.iconWarning} />
                                                </Tooltip>
                                            :
                                                <Tooltip title='Percentual de cobertura Alto'>
                                                    <VerifiedUserOutlined  className={classes.iconSuccess} />
                                                </Tooltip>
                                        } 
                                    </TableCell>                                
                                </TableRow>
                            ))
                        }
                    </TableBody>

                    {/* <TableHead>
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
                    </TableBody> */}


                </Table>
            </TableContainer>

        </Container>
    );

}

export default PeriodAnalysisReport;