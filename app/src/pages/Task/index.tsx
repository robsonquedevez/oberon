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

import BaseNavbar from '../../components/BaseNavbar';
import Map from '../../components/Map';
import Input from '../../components/Input';

import {
    InputGroup,
} from './styles';

import marker from '../../assets/images/marker.svg';

const markerIcon = L.icon({
    iconUrl: marker,
    iconSize: [58, 58],
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

interface IAddRoom {
    taskType: string;
    coordinates: any[];
    setCoordinates(coords: any[]): void;
}

const AddRoom: React.FC<IAddRoom> = ({ taskType, coordinates, setCoordinates }: IAddRoom) => {    
    
    useMapEvents({
        click: (e) => {
            setCoordinates([...coordinates, [e.latlng.lat, e.latlng.lng]]);         
        }
    });       
    
    if (coordinates.length === 0 || taskType === null) {
        return null;
    }

    if(taskType === 'Quadrante' && coordinates.length > 3) {
       return (
        <Polygon
                positions={(coordinates)}
                pathOptions={{
                    color: 'purple'
                }}
            />
        )
    }

    if(coordinates.length > 1) {

       return (
           coordinates.map(point => (            
                <Marker
                    position={point}
                    icon={markerIcon}
                />
                )   
            )
        )
    }

    return (
        <Marker
            position={L.latLng(coordinates[0])}
            icon={markerIcon}
        />
    );
}

const Task: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [selectUser, setSelectUser] = useState<string | null>(null);
    const [selectTaskType, setSelectTaskType] = useState<string>();
    const [coordinates, setCoordinates] = useState<any[]>();
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
                <AddRoom
                    taskType={selectTaskType}                    
                    coordinates
                    setCoordinates
                />


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

            <Drawer
                anchor='left'
                open={openDrawerCoords}
                onClose={handleOpenDrawerCoords}
                variant='persistent'
                className={classes.drawerCoords}
            >
                <MenuItem className={classes.drawerItemTitle}>
                    Coordenadas
                </MenuItem>
            </Drawer>
        </BaseNavbar> 
    );
}

export default Task;