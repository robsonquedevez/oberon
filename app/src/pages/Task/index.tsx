import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Fab,
    makeStyles,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Switch,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    CircularProgress,
    Select,
    InputLabel,
    FormControl,
    Input as SelectInput,
    MenuItem,
    Snackbar,
    TextField,
    Tooltip,
} from '@material-ui/core';
import {
    Add,
    Save,
    Close,
    Room,
} from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useMapEvents, Marker, Popup } from '@monsonjeremy/react-leaflet';
import * as L from 'leaflet';
import { v4 } from 'uuid';
import { useSnackbar } from 'notistack';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import BaseNavbar from '../../components/BaseNavbar';
import Map from '../../components/Map';

import {
    InputGroup,
    SelectedPoints,
    PopUpContent
} from './styles';

import markerImage from '../../assets/images/quadrantMarker.svg';

const MakerIcon = L.icon({
    iconUrl: markerImage,
    iconSize: [18, 18],
});

const useStyles = makeStyles(() => ({
    fabButton: {
        position: 'absolute',
        right: 12,
        bottom: 26,
        zIndex: 999,
    },
    selectForm: {
        width: '70%',
    },
    formGroupWeekDays: {
        marginTop: 15,
    },
    snackColor: {
        backgroundColor: '#FFF',
        color: '#000',
    },
    textField: {
        width: 315,
    }
}));

interface ICoordinates {
    id: string;
    name?: string;
    latitude: number;
    longitude: number;
}

interface ICoordinatesMarker {
    setCoordinates(coords: ICoordinates): void;
}

interface ICoordinatesRoundQuadrant {
    setCoordinates(coords: ICoordinates[]): void;
}

interface User {
    id: string;
    name: string;
}

function removeMarker(marker: string, coordinates: ICoordinates[]) {
     return coordinates.filter( 
        position => position.id !== marker
    )
}

// const AddQuadrant: React.FC<ICoordinatesRoundQuadrant> = ({ setCoordinates }) => {
//     const  [positions, setPositions] = useState<any>([]);

//     useMapEvents({
//         click: (e) => {
//             if(positions.length < 20) {
//                 let position = {
//                     id: v4(),
//                     latitude: e.latlng.lat,
//                     longitude: e.latlng.lng
//                 }
//                 setPositions([ ...positions, position ]);
//                 setCoordinates([ ...positions, position ]);
//             }
//         }
//     });

//     return (positions.length === 0) ? 
//         null 
//     :
//         ( 
//             (positions.length < 3) ?
//                 positions.map((position: ICoordinates) => (     
//                     <Marker
//                         key={position.id}
//                         position={L.latLng(position.latitude, position.longitude)}
//                         icon={MakerIcon}
//                     />
//                 ))
//             :
//             <Polygon
//                 positions={(positions)}
//                 pathOptions={{
//                     color: 'purple'
//                 }}
                
//             />
//         )
    
// }

const AddRound: React.FC<ICoordinatesRoundQuadrant> = ({ setCoordinates }) => {
    const [positions, setPositions] = useState<ICoordinates[] | any>([]);
    const [coordName, setCoordName] = useState<string>('');

    const handleChangeName = useCallback((event) => {
        setCoordName(event.target.value as string)
    }, []);

    const handleSubmitMarker = useCallback((id: string) => {
        positions.map((position: { id: string; name: string; }) => {
            if(position.id === id) {
                position.name = coordName;
            }
            return position;
        });

        setPositions(positions);

        setCoordName('');

    }, [coordName, positions]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 15){
                let position = {
                    id: v4(),
                    latitude: e.latlng.lat,
                    longitude: e.latlng.lng
                }
                setPositions([ ...positions, position ] )
                setCoordinates([ ...positions, position ] )
            }
        }
    });

    return (positions.length === 0) ? 
        null 
    :
    ( 
        
        positions.map((position: ICoordinates) => (               
            <Marker
                key={position.id}
                position={L.latLng(position.latitude, position.longitude)}
                icon={MakerIcon}
                
            >
                <Popup>
                    <PopUpContent>
                    <p>lat: {position.latitude}</p>
                    <p>lng: {position.longitude}</p>

                    {!position.name ? 
                        <div>
                            <TextField
                                variant='outlined'
                                label='Nome'
                                name='coord_name'
                                type='text'
                                onChange={handleChangeName}
                                value={coordName}
                            />

                            <Button
                                color='primary'
                                onClick={
                                    () => handleSubmitMarker(position.id)
                                }
                            >
                                Salvar
                            </Button>
                        </div>
                        :
                        <p>{position.name}</p>
                    }

                    

                    <Button
                        color='secondary'
                        onClick={
                            () => { 
                                setPositions(removeMarker(position.id, positions));
                                setCoordinates(removeMarker(position.id, positions));
                            }
                        }
                    >
                        Remover
                    </Button>

                    </PopUpContent>
                </Popup>
            </Marker>
        ))
        
    )
}

const AddMarker: React.FC<ICoordinatesMarker> = ({ setCoordinates }) => {
    
    const  [position, setPosition] = useState<ICoordinates | null>(null);

    useMapEvents({
        click: (e) => {
            let posit = {
                id: v4(),
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
            }
            setPosition(posit);
            setCoordinates(posit);
        }
    });

    return position === null ? null :  
        
    <Marker
        position={L.latLng(position.latitude, position.longitude)}
        icon={MakerIcon}      
    >
        <Popup>
            <p>lat: {position.latitude}</p>
            <p>lng: {position.longitude}</p>
        </Popup>
    </Marker>
    
};

const Task: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [openCoords, setOpenCoords] = useState<boolean>(false);
    const [users, setUsers] = useState<User[]>([]);
    
    const [coordinatesMarker, setCoordinatesMarker] = useState<ICoordinates | null>(null);
    const [coordinatesRoundQuadrant, setCoordinatesRoundQuadrant] = useState<ICoordinates[]>([]);
    const [selectUser, setSelectUser] = useState<string | null>(null);
    const [selectTaskType, setSelectTaskType] = useState<number | null>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [taskRepeat, setTaskRepeat] = useState<boolean>(false);
    const [taskWeekDays, setTaskWeekDays] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            api.get(`/user/${user.enterprise}`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        })()
    }, [user.enterprise]);

    const handleClearDialogTask = useCallback(() => {
        setSelectUser(null);
        setSelectTaskType(null);
        setTaskTitle('');
        setStartDate('');
        setEndDate('');
        setTaskRepeat(false);
        setTaskWeekDays([]);
        setCoordinatesMarker(null);
        setCoordinatesRoundQuadrant([]);
        setOpen(!open);
    }, [open]);

    const handleSubmit = useCallback( async () => {
        setBtnLoading(true);

        var daysWeek = '';
        
        taskWeekDays.map(day => {
            return daysWeek += day+',';
        });

        const coordinates = coordinatesMarker ? coordinatesMarker : coordinatesRoundQuadrant;

        try{
            await api.post('/task', {                
                type: selectTaskType,
                title: taskTitle,
                executing_user: selectUser,
                enterprise: user.enterprise,
                status_task: 0,
                start_task: startDate,
                end_task: endDate,
                repeat: taskRepeat,
                days_of_the_week: daysWeek,
                finished: false,
                coordinates                
            })
            setBtnLoading(false);
            handleClearDialogTask();
            enqueueSnackbar('Tarefa cadastrada com sucesso!', { variant: 'success' });
        }catch(error: any){
            
            const msg = error.response.data? error.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        }
        setBtnLoading(false);
    }, [ 
        selectUser, 
        selectTaskType, 
        taskTitle, 
        startDate, 
        endDate, 
        taskRepeat, 
        taskWeekDays, 
        coordinatesMarker, 
        coordinatesRoundQuadrant,
        enqueueSnackbar,
        user,
        handleClearDialogTask
    ]);

    const handleOpenDialogTask = useCallback(() => {
        setOpen(!open);
    }, [open]);    

    const handleChangeSelectUser = useCallback((event) => {
        setSelectUser(event.target.value as string);
    }, []);

    const handleChangeSelectTaskType = useCallback((event) => {
        setSelectTaskType(event.target.value as number);
    }, []);

    const handleOpenCoords = useCallback(() => {
        setOpen(!open);
        setOpenCoords(!openCoords);
    }, [open, openCoords]);

    const handleTitle = useCallback((event) => {
        setTaskTitle(event.target.value as string);
    }, []);

    const handleStartDate = useCallback((event) => {
        setStartDate(event.target.value as string);
    }, []);

    const handleEndDate = useCallback((event) => {
        setEndDate(event.target.value as string);
    }, []);

    const handleRepeat = useCallback(() => {
        setTaskRepeat(!taskRepeat);
    }, [taskRepeat]);

    const handleWeekDays = useCallback((newDay: string) => {

        if(taskWeekDays.filter(day => day === newDay).length > 0){
            setTaskWeekDays(taskWeekDays.filter(day => day !== newDay));
        }else {
            setTaskWeekDays([...taskWeekDays, newDay]);
        }        

    }, [taskWeekDays]);    

    return (
        <BaseNavbar pageActive='task'>            
            <Map
                
            >
                {
                    (selectTaskType !== null && selectTaskType === 2) &&
                    // <AddQuadrant 
                    //     setCoordinates={setCoordinatesRoundQuadrant}
                    // />
                    null
                }

                {
                    (selectTaskType !== null && selectTaskType === 1) &&
                    <AddRound 
                        setCoordinates={setCoordinatesRoundQuadrant}
                    />
                }
                {
                    (selectTaskType !== null && selectTaskType === 3) &&
                    <AddMarker 
                        setCoordinates={setCoordinatesMarker}
                    />
                }


                <Fab 
                    className={classes.fabButton}
                    variant='extended' 
                    color='primary' 
                    aria-label="adicionar nova tarefa"
                    onClick={handleOpenDialogTask}
                    disabled={openCoords}
                > 
                    <Add />
                    Nova Tarefa
                </Fab>

            </Map>
            
            <Dialog
                fullWidth={true}
                maxWidth='md'
                open={open}
                onClose={handleOpenDialogTask}
            >
                <DialogTitle>Criar nova tarefa</DialogTitle>

                <Form ref={formRef} onSubmit={handleSubmit}>

                    <DialogContent>

                        <InputGroup>

                            <TextField
                                variant='outlined'
                                label='Título'
                                name='tack_title'
                                type='text'
                                onChange={handleTitle}
                                value={taskTitle}
                                className={classes.textField}
                            />

                            <FormControl className={classes.selectForm}>
                                <InputLabel id='label-select-user' >Usuário</InputLabel>
                                <Select
                                    labelId='label-select-user'
                                    input={<SelectInput />}
                                    name='executing_user'
                                    variant='standard'
                                    onChange={handleChangeSelectUser}
                                    value={selectUser}
                                    style={{ height: 48 }}
                                >
                                    { users.map(user => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name}
                                        </MenuItem>
                                    )) }

                                </Select>
                            </FormControl>

                        </InputGroup>

                        <InputGroup>
                        
                            <FormControl className={classes.selectForm}>
                                <InputLabel id='label-select-task-type' >Tipo</InputLabel>
                                <Select
                                    labelId='label-select-task-type'
                                    input={<SelectInput />}
                                    name='type'
                                    variant='standard'
                                    onChange={handleChangeSelectTaskType}
                                    value={selectTaskType}
                                    style={{ height: 48 }}
                                >
                                    <MenuItem value={1}>
                                        Ronda
                                    </MenuItem>

                                    {/* <MenuItem value={2}>
                                        Quadrante
                                    </MenuItem>

                                    <MenuItem value={3}>
                                        Ponto de chegada
                                    </MenuItem> */}
                                </Select>
                            </FormControl>

                            <TextField
                                label='Início'
                                name='start_task'
                                type='datetime-local'
                                variant='filled'
                                className={classes.textField}
                                onChange={handleStartDate}
                                value={startDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}                              
                            />

                            <TextField
                                label='Fim'
                                name='end_task'
                                type='datetime-local'
                                variant='filled'
                                className={classes.textField}
                                onChange={handleEndDate}
                                value={endDate}
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                            />

                        </InputGroup>

                        <FormControlLabel
                            className={classes.formGroupWeekDays}
                            control={
                                <Switch color='primary' onChange={handleRepeat} checked={taskRepeat} />
                            }
                            label='Repetir'
                        />

                        <FormGroup row className={classes.formGroupWeekDays}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('sunday')}  
                                        checked={taskWeekDays.find( day => day === 'sunday') === 'sunday' ? true : false}
                                    />
                                }
                                label='Domingo'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('monday')}  
                                        checked={taskWeekDays.find( day => day === 'monday') === 'monday' ? true : false}
                                    />
                                }
                                label='Segunda'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('tuesday')}  
                                        checked={taskWeekDays.find( day => day === 'tuesday') === 'tuesday' ? true : false}
                                    />
                                }
                                label='Terça'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('wednesday')}  
                                        checked={taskWeekDays.find( day => day === 'wednesday') === 'wednesday' ? true : false}
                                    />
                                }
                                label='Quarta'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('thursday')}  
                                        checked={taskWeekDays.find( day => day === 'thursday') === 'thursday' ? true : false}
                                    />
                                }
                                label='Quinta'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('friday')}  
                                        checked={taskWeekDays.find( day => day === 'friday') === 'friday' ? true : false}
                                    />
                                }
                                label='Sexta'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        color='primary' 
                                        onChange={() => handleWeekDays('saturday')}  
                                        checked={taskWeekDays.find( day => day === 'saturday') === 'saturday' ? true : false}
                                    />
                                }
                                label='Sábado'
                                disabled={!taskRepeat}
                            />                            

                        </FormGroup>
                        
                        <SelectedPoints> 

                        <Button
                            variant="outlined"
                            color='primary'
                            type='button'
                            endIcon={ <Room />}
                            onClick={handleOpenCoords}
                            disabled={selectTaskType === null ? true : false}
                        >
                            Adicionar pontos no mapa
                        </Button>
                        
                        {
                            selectTaskType === null ? null :
                            selectTaskType === 3 ?
                            (
                                coordinatesMarker === null ? null :
                                    <Tooltip title="Ver no mapa">
                                        <h5 onClick={handleOpenCoords} >
                                            Ponto Selecionado 
                                        </h5>
                                    </Tooltip>)
                            :
                            ( 
                                <Tooltip title="Ver no mapa">
                                    <h5 onClick={handleOpenCoords} >
                                        {coordinatesRoundQuadrant.length} Pontos selecionados 
                                    </h5>
                                </Tooltip>
                            )
                        }
                        </SelectedPoints>

                    </DialogContent>

                    <DialogActions>
                        <Button
                            variant="outlined"
                            color='secondary'
                            type='button'
                            endIcon={ <Close />}
                            onClick={handleClearDialogTask}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color='primary'
                            type='submit'
                            endIcon={
                                btnLoading ?
                                <CircularProgress color='inherit' size={18} />
                                : <Save />
                            }
                            disabled={btnLoading}
                        >
                            Salvar
                        </Button>
                    </DialogActions>
                
                </Form>

            </Dialog>

            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={openCoords}
                message={taskTitle.length > 0 ? taskTitle : 'Nova tarefa'}
                key={v4()}
                className={classes.snackColor}
                action={
                    <Button
                        endIcon={<Save />}
                        onClick={handleOpenCoords}
                    >
                        Terminar
                    </Button>
                }
            />

        </BaseNavbar> 
    );
}

export default Task;