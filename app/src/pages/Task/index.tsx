import React, { useCallback, useRef, useState } from 'react';
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
    Tooltip
} from '@material-ui/core';
import {
    Add,
    Save,
    Close,
    Room,
} from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useMapEvents, Marker, Polygon, Popup } from '@monsonjeremy/react-leaflet';
import * as L from 'leaflet';
import { v4 } from 'uuid';

import BaseNavbar from '../../components/BaseNavbar';
import Map from '../../components/Map';

import {
    InputGroup,
    SelectedPoints,
    PopUpContent
} from './styles';

import marker from '../../assets/images/marker.svg';
import QuadMarker from '../../assets/images/quadrantMarker.svg';

const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [58, 58],
});

const quadMarkerIcon = L.icon({
    iconUrl: QuadMarker,
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

interface Coords {
    lat: number;
    lng: number;
}

interface ICoordinatesMarker {
    setCoordinates(coords: L.LatLng): void;
}

interface ICoordinatesRoundQuadrant {
    setCoordinates(coords: L.LatLng[]): void;
}

function removeMarker(marker: L.LatLng, coordinates: L.LatLng[]) {
     return coordinates.filter( 
         position => position.lat !== marker.lat && position.lng !== marker.lng
    )
}

const AddQuadrant: React.FC<ICoordinatesRoundQuadrant> = ({ setCoordinates }) => {
    const  [positions, setPositions] = useState<any>([]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 20){
                setPositions([ ...positions, e.latlng ]);
                setCoordinates([ ...positions, e.latlng ]);
            }
        }
    });

    return (positions.length === 0) ? 
        null 
    :
        ( 
            (positions.length < 3) ?
                positions.map((element: L.LatLngLiteral) => (     
                    <Marker
                        key={v4()}
                        position={L.latLng(element)}
                        icon={quadMarkerIcon}
                    />
                ))
            :
            <Polygon
                positions={(positions)}
                pathOptions={{
                    color: 'purple'
                }}
                
            />
        )
    
}

const AddRound: React.FC<ICoordinatesRoundQuadrant> = ({ setCoordinates }) => {
    const  [positions, setPositions] = useState<any>([]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 10){
                setPositions([ ...positions, e.latlng ] )
                setCoordinates([ ...positions, e.latlng ] )
            }
        }
    });

    return (positions.length === 0) ? 
        null 
    :
    ( 
        
        positions.map((element: L.LatLng) => (               
            <Marker
                key={v4()}
                position={L.latLng(element)}
                icon={quadMarkerIcon}
                
            >
                <Popup>
                    <PopUpContent>
                    <p>lat: {element.lat}</p>
                    <p>lng: {element.lng}</p>

                    <Button
                    color='secondary'
                    onClick={
                        () => { 
                            setPositions(removeMarker(element, positions));
                            setCoordinates(removeMarker(element, positions));
                        }
                    }
                    >Remover</Button>
                    </PopUpContent>
                </Popup>
            </Marker>
        ))
        
    )
}

const AddMarker: React.FC<ICoordinatesMarker> = ({ setCoordinates }) => {
    
    const  [position, setPosition] = useState<L.LatLng | null>(null);

    useMapEvents({
        click: (e) => {
            setPosition(L.latLng(e.latlng));
            setCoordinates(L.latLng(e.latlng));
        }
    });

    return position === null ? null :  
        
    <Marker
        position={position}
        icon={quadMarkerIcon}      
    >
        <Popup>
            <p>lat: {position.lat}</p>
            <p>lng: {position.lng}</p>
        </Popup>
    </Marker>
    
};

const Task: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [openCoords, setOpenCoords] = useState<boolean>(false);
    
    const [coordinatesMarker, setCoordinatesMarker] = useState<L.LatLng | null>(null);
    const [coordinatesRoundQuadrant, setCoordinatesRoundQuadrant] = useState<L.LatLng[]>([]);
    const [selectUser, setSelectUser] = useState<string | null>(null);
    const [selectTaskType, setSelectTaskType] = useState<string | null>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [taskRepeat, setTaskRepeat] = useState<boolean>(false);
    const [taskWeekDays, setTaskWeekDays] = useState<string[]>([]);

    const handleOpenDialogTask = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleCancelDialogTask = useCallback(() => {
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

    const handleChangeSelectUser = useCallback((event) => {
        setSelectUser(event.target.value as string);
    }, []);

    const handleChangeSelectTaskType = useCallback((event) => {
        setSelectTaskType(event.target.value as string);
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
                    (selectTaskType !== null && selectTaskType === 'Quadrante') &&
                    <AddQuadrant 
                        setCoordinates={setCoordinatesRoundQuadrant}
                    />
                }

                {
                    (selectTaskType !== null && selectTaskType === 'Ronda') &&
                    <AddRound 
                        setCoordinates={setCoordinatesRoundQuadrant}
                    />
                }
                {
                    (selectTaskType !== null && selectTaskType === 'Ponto de chegada') &&
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

                <Form ref={formRef} onSubmit={() => {}}>

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
                                    <MenuItem value={'teste'}>
                                        teste
                                    </MenuItem>

                                    <MenuItem value={'teste2'}>
                                        teste2
                                    </MenuItem>
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
                                    <MenuItem value={'Ronda'}>
                                        Ronda
                                    </MenuItem>

                                    <MenuItem value={'Quadrante'}>
                                        Quadrante
                                    </MenuItem>

                                    <MenuItem value={'Ponto de chegada'}>
                                        Ponto de chegada
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label='Início'
                                name='start_task'
                                type='date'
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
                                type='date'
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
                            selectTaskType === 'Ponto de chegada' ?
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
                            onClick={handleCancelDialogTask}
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