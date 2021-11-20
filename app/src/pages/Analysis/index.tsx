import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import {
    Paper,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input as SelectInput,
    CircularProgress,
    Button,
    TextField,
} from '@material-ui/core';
import {
    Search as SearchIcon,
} from '@material-ui/icons';
import { useSnackbar } from 'notistack'

import api from '../../services/api';
import {
    useAuth
} from '../../hooks/Auth';

import BaseNavbar from '../../components/BaseNavbar';
import DailyAnalysisReport from '../../components/DailyAnalysisReport';
import PeriodAnalysisReport from '../../components/PeriodAnalysisReport';

import {
    Container,
    Search,
    ShowDetails,
} from './styles';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        padding: 15,
        width: '100%',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-arrow',
        alignItems: 'center',
    },
    selectForm: {
        width: '100%',
        marginLeft: 10,      
        marginRight: 10,
    },
    btnSearch: {
        paddingRight: 40,
        paddingLeft: 40,
    },
    formGroupWeekDays: {
        marginTop: 15,
    },
    snackColor: {
        backgroundColor: '#FFF',
        color: '#000',
    },
    textField: {
        width: '100%',
        marginLeft: 10,      
        marginRight: 10,
    },
    accord: {
        width: '100%',
    },
    iconChecked: {
        color: '#00e676'
    },
    iconNotChecked: {
        color: '#ff3d00'
    },
    accordDetailsBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    appBar: {
        position: 'relative',
      },
}));

interface IUser {
    id: string;
    name: string;
}

interface IListTask{
    id: string;
    title: string;
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

const Analysis: React.FC = () => {
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const classes = useStyles();
    const [users, setUsers] = useState<IUser[]>([]);
    const [listTask, setListTask] = useState<IListTask[]>([]);
    const [task, setTask] = useState<ITask | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    
    const [userSelect, setUserSelect] = useState<string | null>(null);
    const [taskSelect, setTaskSelect] = useState<string | null>(null);
    const [analysisType, setAnalysisType] = useState<number>(0);
    const [searchStartDate, setSearchStartDate] = useState<string>('none');
    const [searchEndDate, setSearchEndDate] = useState<string>('none');   

    useEffect(() => {
        (
            async () => {
                api.get(`/user/${user.enterprise}`)
                .then(response => {
                    setUsers(response.data);
                })
                .catch((error: any) => {
                    const msg = error.response? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

                    enqueueSnackbar(msg, { variant: 'error' });
                })
            }
        )()
    }, [user.enterprise, enqueueSnackbar]);

    const handleChangeSelectUser = useCallback( async (event) => {
        setUserSelect(event.target.value as string);
        setTask(null);

        api.get(`/task/user/${event.target.value}`)
        .then(response => {
            setListTask(response.data);
        })
        .catch((error: any) => {
            const msg = error.response? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        })

    }, [enqueueSnackbar]);

    const handleChangeSelectTask = useCallback( (event) => {
        setTaskSelect(event.target.value as string);
        setTask(null);
    }, []);
    
    const handleSubmit = useCallback( async () => {
        setBtnLoading(true);

        api.get(`/task/analysis/${taskSelect}/${analysisType}/${searchStartDate}/${searchEndDate}`)
        .then(response => {
            setTask(response.data);
            setBtnLoading(false);
        })
        .catch((error: any) => {
            const msg = error.response? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

            console.log(error.data);

            enqueueSnackbar(msg, { variant: 'error' });
            setBtnLoading(false);
        })

    }, [enqueueSnackbar, taskSelect, analysisType, searchStartDate, searchEndDate]);

    const handleSearchStartDate = useCallback((event) => {
        setSearchStartDate(event.target.value as string);
    }, []);

    const handleSearchEndDate = useCallback((event) => {
        setSearchEndDate(event.target.value as string);
    }, []);

    const handleChangeAnalysisType = useCallback((event) => {
        setAnalysisType(Number(event.target.value as string));
        setTask(null);
    }, []);

    return (
        <BaseNavbar pageActive='analysis' > 
            <Container>
                
                <Search>

                    <h2>Análises</h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <Form ref={formRef} onSubmit={handleSubmit} className={classes.form}>

                            <FormControl className={classes.selectForm}>
                                <InputLabel id='label-select-user' >Usuário</InputLabel>
                                <Select
                                    labelId='label-select-user'
                                    input={<SelectInput />}
                                    name='executing_user'
                                    variant='filled'
                                    onChange={handleChangeSelectUser}
                                    value={userSelect}
                                    style={{ height: 48 }}
                                >
                                    { users.map(user => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    )) }

                                </Select>
                            </FormControl>

                            <FormControl className={classes.selectForm}>
                                <InputLabel id='label-select-user' >Tarefa</InputLabel>
                                <Select
                                    labelId='label-select-user'
                                    input={<SelectInput />}
                                    name='task'
                                    variant='filled'
                                    onChange={handleChangeSelectTask}
                                    value={taskSelect}
                                    style={{ height: 48 }}
                                    disabled={listTask.length > 0 ? false : true}
                                >
                                    { 
                                        listTask.length > 0
                                        ?
                                        listTask.map(task => (
                                                <MenuItem key={task.id} value={task.id}>
                                                    {task.title}
                                                </MenuItem>
                                            )) 
                                        :
                                            <MenuItem>
                                                <CircularProgress />
                                            </MenuItem>
                                    }

                                </Select>
                            </FormControl>

                            <FormControl className={classes.selectForm}>
                                <InputLabel id='label-select-task-type' >Tipo</InputLabel>
                                <Select
                                    labelId='label-select-task-type'
                                    input={<SelectInput />}
                                    name='type'
                                    variant='standard'
                                    onChange={handleChangeAnalysisType}
                                    value={analysisType}
                                    style={{ height: 48 }}
                                >
                                    <MenuItem value={1}>
                                        Diário
                                    </MenuItem>

                                    <MenuItem value={2}>
                                        Período
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label='Início'
                                name='start_task'
                                type='date'
                                variant='filled'
                                className={classes.textField}
                                onChange={handleSearchStartDate}
                                value={searchStartDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}                              
                            />

                            <TextField
                                label='Fim'
                                name='start_task'
                                type='date'
                                variant='filled'
                                className={classes.textField}
                                onChange={handleSearchEndDate}
                                value={searchEndDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled={(analysisType === 1 || analysisType === 0) ? true : false}                            
                            />

                            <Button
                                variant="contained"
                                color='primary'
                                type='submit'
                                endIcon={
                                    btnLoading ?
                                    <CircularProgress color='inherit' size={18} />
                                    : <SearchIcon />
                                }
                                disabled={
                                    btnLoading || 
                                    (!userSelect || !taskSelect || searchStartDate === 'none') ? true : false
                                }
                                className={classes.btnSearch}
                            >
                                Buscar
                            </Button>

                        </Form>

                    </Paper>

                </Search>

                {
                    task &&

                    <ShowDetails>

                        {task.executing.map(execute => (

                            <div>

                                {analysisType === 2 &&

                                    <PeriodAnalysisReport 
                                        task={task} 
                                        executing_user={users.filter(user => user.id === userSelect)[0].name}
                                        startDate={searchStartDate}
                                        endDate={searchEndDate}
                                    />
                                    
                                }

                                {analysisType === 1 && 
                                
                                    <DailyAnalysisReport 
                                        task={task}
                                        executing_user={users.filter(user => user.id === userSelect)[0].name}
                                        date={searchStartDate}
                                    />
                                
                                }
                            </div>

                        ))}              

                    </ShowDetails>
                }

            </Container>
        </BaseNavbar>
    );
}

export default Analysis;