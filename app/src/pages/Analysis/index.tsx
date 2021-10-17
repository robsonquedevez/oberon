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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    FormControlLabel,
    Checkbox,
    FormGroup
} from '@material-ui/core';
import {
    Search as SearchIcon
} from '@material-ui/icons';
import { useSnackbar } from 'notistack'
import { useMapEvents, Marker, Polygon, Popup } from '@monsonjeremy/react-leaflet';
import * as L from 'leaflet';
import { v4 } from 'uuid';

import api from '../../services/api';
import {
    useAuth
} from '../../hooks/Auth';

import BaseNavbar from '../../components/BaseNavbar';
import Map from '../../components/Map';

import {
    Container,
    Search,
    TextDetail,
    InputGroup,
    ShowDetails,
    DisplayMap
} from './styles';

import markerImage from '../../assets/images/quadrantMarker.svg';

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
        width: 285,
    },
    accord: {
        width: '100%',
    }
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
            lat: number;
            lng: number;
        }
    ]
}

const MakerIcon = L.icon({
    iconUrl: markerImage,
    iconSize: [18, 18],
});

const Analysis: React.FC = () => {
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const formTaskRef = useRef<FormHandles>(null);
    const classes = useStyles();
    const [users, setUsers] = useState<IUser[]>([]);
    const [listTask, setListTask] = useState<IListTask[]>([]);
    const [task, setTask] = useState<ITask | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const [userSelect, setUserSelect] = useState<string | null>(null);
    const [taskSelect, setTaskSelect] = useState<string | null>(null);

    const typesTask = ['Ronda', 'Quadrante', 'Ponto de chegada'];

    useEffect(() => {
        (
            async () => {
                api.get(`/user/${user.enterprise}`)
                .then(response => {
                    setUsers(response.data);
                })
                .catch((error: any) => {
                    const msg = error.response.data? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

                    enqueueSnackbar(msg, { variant: 'error' });
                })
            }
        )()
    }, [user.enterprise, enqueueSnackbar]);

    const handleChangeSelectUser = useCallback( async (event) => {
        setUserSelect(event.target.value as string);

        api.get(`/task/user/${event.target.value}`)
        .then(response => {
            setListTask(response.data);
        })
        .catch((error: any) => {
            const msg = error.response.data? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        })

    }, [enqueueSnackbar]);

    const handleChangeSelectTask = useCallback( (event) => {
        setTaskSelect(event.target.value as string);

    }, []);
    
    const handleSubmit = useCallback( async () => {
        setBtnLoading(true);

        api.get(`/task/${taskSelect}`)
        .then(response => {
            setTask(response.data);
            setBtnLoading(false);
        })
        .catch((error: any) => {
            const msg = error.response.data? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
            setBtnLoading(false);
        })

    }, [enqueueSnackbar, taskSelect]);


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

                            <Button
                                variant="contained"
                                color='primary'
                                type='submit'
                                endIcon={
                                    btnLoading ?
                                    <CircularProgress color='inherit' size={18} />
                                    : <SearchIcon />
                                }
                                disabled={btnLoading}
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
                        <Accordion className={classes.accord}>
                            <AccordionSummary>
                                <TextDetail> + detalhes da tarefa: {task.task.title} </TextDetail>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Form 
                                    ref={formTaskRef} 
                                    onSubmit={() => {}}
                                >
                                <InputGroup>

                                    <TextField
                                        variant='outlined'
                                        label='Título'
                                        name='tack_title'
                                        type='text'
                                        value={task.task.title}
                                        className={classes.textField}
                                        disabled
                                    />

                                    <TextField
                                        variant='outlined'
                                        label='Tipo'
                                        name='type_task'
                                        type='text'
                                        value={ typesTask[task.task.type - 1 ]}
                                        className={classes.textField}
                                        disabled
                                    />                                   

                                    <TextField
                                        variant='outlined'
                                        label='Início'
                                        name='start_task'
                                        type='text'
                                        className={classes.textField}
                                        value={task.task.start_task}      
                                        disabled                       
                                    />

                                    <TextField
                                        variant='outlined'
                                        label='Fim'
                                        name='end_task'
                                        type='text'
                                        className={classes.textField}
                                        value={task.task.end_task}
                                        disabled
                                    />

                                    </InputGroup>

                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={!!task.task.repeat}
                                            />
                                        }
                                        label='Repetir'
                                        disabled
                                    />                                    

                                    <FormGroup row className={classes.formGroupWeekDays}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'sunday') === 'sunday' ? true : false}
                                            />
                                        }
                                        label='Domingo'
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'monday') === 'monday' ? true : false}
                                            />
                                        }
                                        label='Segunda'
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary'  
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'tuesday') === 'tuesday' ? true : false}
                                            />
                                        }
                                        label='Terça'
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'wednesday') === 'wednesday' ? true : false}
                                            />
                                        }
                                        label='Quarta'
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'thursday') === 'thursday' ? true : false}
                                            />
                                        }
                                        label='Quinta'
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'friday') === 'friday' ? true : false}
                                            />
                                        }
                                        label='Sexta'
                                        disabled
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                color='primary' 
                                                checked={task.task.days_of_the_week.split(',').find( day => day === 'saturday') === 'saturday' ? true : false}
                                            />
                                        }
                                        label='Sábado'
                                        disabled
                                    />                            

                                    </FormGroup>
                                </Form>
                            </AccordionDetails>
                        </Accordion>
                        
                        <DisplayMap>
                            <Map
                                initialPosition={[task.coordinates[0].lat, task.coordinates[0].lng]}  
                                zoomScroll={false}    
                            >
                            
                            {
                                task.task.type === 2 
                                ?
                                    <Polygon
                                        positions={task.coordinates}                                        
                                    />
                                :
                                    task.coordinates.map(coord => (
                                        <Marker
                                            icon={MakerIcon}
                                            position={coord}
                                        />
                                    ))
                            }

                            </Map>
                        </DisplayMap>
                    </ShowDetails>
                }

            </Container>
        </BaseNavbar>
    );
}

export default Analysis;