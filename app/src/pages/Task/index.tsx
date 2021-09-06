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
    Drawer
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
        border: 1,
        borderRadius: 10,
        borderColor: '#000000',
    },
    drawerCoords: {
        width: 160,
    },
    drawerItemTitle: {
        marginTop: 64,
    }

}));

interface Coords {
    lat: number;
    lng: number;
}

interface ICoordinates {
    setCoordinates(coords: any): void;
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

const AddRonda: React.FC = () => {
    const  [positions, setPositions] = useState<any>([]);

    useMapEvents({
        click: (e) => {
            if(positions.length < 10){
                setPositions([ ...positions, e.latlng ] )
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

const AddMarker: React.FC<ICoordinates> = ({ setCoordinates }) => {
    
    const  [position, setPosition] = useState<any>(null);

    useMapEvents({
        click: (e) => {
            setPosition(L.latLng(e.latlng));
            setCoordinates([ e.latlng.lat, e.latlng.lng ]);
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
    const [selectUser, setSelectUser] = useState<string | null>(null);
    const [selectTaskType, setSelectTaskType] = useState<string | null>(null);
    const [coordinates, setCoordinates] = useState<L.LatLng | null>(null);
    const [openDrawerCoords, setOpenDrawerCoords] = useState<boolean>(false);

    const handleOpenDialogTask= useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleChangeSelectUser = useCallback((event) => {
        setSelectUser(event.target.value as string);
    }, []);

    const handleChangeSelectTaskType = useCallback((event) => {
        setSelectTaskType(event.target.value as string);
    }, []);

    const handleOpenDrawerCoords = useCallback(() => {
        setOpen(!open);
        setOpenDrawerCoords(!openDrawerCoords);
    }, [open, openDrawerCoords]);

    const handleSetCoordinates = useCallback(() => {       
        
    }, []);

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
                    <AddRonda />
                }
                {
                    (selectTaskType !== null && selectTaskType === 'Ponto de chegada') &&
                    <AddMarker 
                        setCoordinates={setCoordinates}
                    />
                }


                <Fab 
                    className={classes.fabButton}
                    variant='extended' 
                    color='primary' 
                    aria-label="adicionar nova tarefa"
                    onClick={handleOpenDialogTask}
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

                            <Input
                                label='Título'
                                name='tack_title'
                                type='text'
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

                            <Input
                                label='Início'
                                name='start_task'
                                type='date'
                                variant='filled'
                                shrink={true}                                
                            />

                            <Input
                                label='Fim'
                                name='end_task'
                                type='date'
                                variant='filled'
                                shrink={true}  
                            />

                        </InputGroup>

                        <FormControlLabel
                            control={
                                <Switch color='primary' />
                            }
                            label='Repetir'
                        />

                        <FormGroup row className={classes.formGroupWeekDays}>
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Segunda'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Terça'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Quarta'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Quinta'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Sexta'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Sábado'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox color='primary' />
                                }
                                label='Domingo'
                            />

                        </FormGroup>

                        <Button
                            variant="outlined"
                            color='primary'
                            type='button'
                            className={classes.btnAddRoom}
                            endIcon={ <Room />}
                            onClick={handleOpenDrawerCoords}
                        >
                            Adicionar pontos no mapa
                        </Button>

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

        </BaseNavbar> 
    );
}

export default Task;