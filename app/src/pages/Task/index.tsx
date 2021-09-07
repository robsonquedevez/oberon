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
    TextField
} from '@material-ui/core';
import {
    Add,
    Save,
    Close,
    Room,
} from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useMapEvents, Marker, Polygon } from '@monsonjeremy/react-leaflet';
import * as L from 'leaflet';
import { v4 } from 'uuid';

import BaseNavbar from '../../components/BaseNavbar';
import Map from '../../components/Map';
import Input from '../../components/Input';

import {
    InputGroup,
    SelectedPoints
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
    btnAddRoom: {
        marginTop: 35,
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
    }
}));

interface Coords {
    lat: number;
    lng: number;
}

interface ICoordinatesMarker {
    setCoordinates(coords: any): void;
}

interface ICoordinatesRoundQuadrant {
    setCoordinates(coords: any[]): void;
}

const AddQuadrant: React.FC = () => {
    const  [positions, setPositions] = useState<any>([]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 20){
                setPositions([ ...positions, e.latlng ] )
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

const AddRound: React.FC<ICoordinatesRoundQuadrant> = ({ setCoordinates: setCoordinatesRoundQuadrant }) => {
    const  [positions, setPositions] = useState<any>([]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 10){
                setPositions([ ...positions, e.latlng ] )
                setCoordinatesRoundQuadrant([ ...positions, e.latlng ] )
            }
        }
    });

    return (positions.length === 0) ? 
        null 
    :
    ( 
        
        positions.map((element: L.LatLngLiteral) => (     
            <Marker
                key={v4()}
                position={L.latLng(element)}
                icon={quadMarkerIcon}
            />
        ))
        
    )
}

const AddMarker: React.FC<ICoordinatesMarker> = ({ setCoordinates: setCoordinatesMarker }) => {
    
    const  [position, setPosition] = useState<any>(null);

    useMapEvents({
        click: (e) => {
            setPosition(L.latLng(e.latlng));
            setCoordinatesMarker([ e.latlng.lat, e.latlng.lng ]);
        }
    });

    return position === null ? null :
    <Marker
        position={position}
        icon={markerIcon}
    />
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


    const handleOpenDialogTask= useCallback(() => {
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

    return (
        <BaseNavbar pageActive='task'>            
            <Map
                
            >
                {
                    (selectTaskType !== null && selectTaskType === 'Quadrante') &&
                    <AddQuadrant />
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
                                    <Checkbox color='primary' />
                                }
                                label='Segunda'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Terça'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Quarta'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Quinta'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Sexta'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Sábado'
                                disabled={!taskRepeat}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Domingo'
                                disabled={!taskRepeat}
                            />

                        </FormGroup>
                        
                        <SelectedPoints> 

                        <Button
                            variant="outlined"
                            color='primary'
                            type='button'
                            className={classes.btnAddRoom}
                            endIcon={ <Room />}
                            onClick={handleOpenCoords}
                        >
                            Adicionar pontos no mapa
                        </Button>
                        
                        {
                            selectTaskType === null ? null :
                            selectTaskType === 'Ponto de chegada' ?
                            <p> {coordinatesMarker} </p>
                            :
                            ( <p> {coordinatesRoundQuadrant.length} Pontos selecionados </p>)
                        }
                        </SelectedPoints>

                    </DialogContent>

                    <DialogActions>
                        <Button
                            variant="outlined"
                            color='secondary'
                            type='button'
                            endIcon={ <Close />}
                            onClick={handleOpenDialogTask}
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
                message={taskTitle}
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