import React, { useCallback, useEffect, useRef, useState } from 'react';
import BaseNavbar from '../../components/BaseNavbar';
import {
    Paper,
    Button,
    CircularProgress,
    makeStyles,
    IconButton,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Checkbox,
    FormControlLabel,
    Tooltip
} from '@material-ui/core';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { 
    PersonAdd, 
    Edit,
    Save,
    Close,
    Mail,
    Delete
} from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../hooks/Auth';

import api from '../../services/api';

import Input from '../../components/Input';

import {    
    Container,
    Content,
    InputGroup
} from './styles';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        padding: 15,
        width: '100%',
        height: 450,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    grid: {
        width: '100%',
        marginBottom: 15,
    }
}));

interface ISelectUserEdit {
    name: string;
    email: string;
    admin: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    administrator: boolean;
}

const User: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const formRefCreate = useRef<FormHandles>(null);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [showDialogUser, setShowDialogUser] = useState<boolean>(false);
    const [showDialogCreateUser, setShowDialogCreateUser] = useState<boolean>(false);
    const [selectUserEdit, setSelectUserEdit] = useState<ISelectUserEdit | null >(null);
    const [users, setUsers] = useState<User[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();
    const [update, setUpdate] = useState<boolean>(false);

    useEffect(() => {
        (
            async () => {
                api.get(`/user/${user.enterprise}`)
                .then(response => {
                    setUsers(response.data);
                    setUpdate(false);
                })
                .catch(error => {
                    enqueueSnackbar(error.message, { variant: 'error' });
                });
            }
        )()
    }, [enqueueSnackbar, user.enterprise, update]);

    const handleOpenDialogUser = useCallback(() => {
        setShowDialogUser(!showDialogUser);

        if(!showDialogUser){
            setSelectUserEdit(null);
        }

    }, [showDialogUser]);

    const handleOpenDialogCreateUser = useCallback(() => {
        setShowDialogCreateUser(!showDialogCreateUser)
    }, [showDialogCreateUser]);

    const handleOpenEditUser = useCallback((id: string) => {
        setShowDialogUser(true);

        const user = users.filter(user => user.id === id)[0];

        setSelectUserEdit({
            name: user.name,
            email: user.email,
            admin: user.administrator
        });
    }, [users]);

    const handleSubmitCreateUser = useCallback( async (data: ISelectUserEdit) => {
        
        try {
            await api.post('/user', {
                name: data.name,
                email: data.email,
                administrator: data.admin ? true : false,
                enterprise: user.enterprise,
                invite: true
            });    
            handleOpenDialogCreateUser();
            enqueueSnackbar('Usuário cadastrado com sucesso!', { variant: 'success' });
            setBtnLoading(false);
            setUpdate(true);      
        } catch (error) {
            setBtnLoading(false);            

            const msg = error.response ? error.response.data.message : 'Erro ao cadastrar novo usuário. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        }
    }, [enqueueSnackbar, user.enterprise, handleOpenDialogCreateUser]);

    const DeleteUser = useCallback(async (id: string) => {
        try {
            await api.delete('/user', {
                data: {
                    id
                }
            });
            enqueueSnackbar('Usuário excluido com sucesso!', { variant: 'success' });
            setUpdate(true); 
        } catch (error) {
            setBtnLoading(false);            

            const msg = error.response ? error.response.data.message : 'Erro ao cadastrar novo usuário. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        }
       
    }, [enqueueSnackbar]);

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 90,
            editable: false,
            disableReorder: true,
            disableColumnMenu: true,
            hide: true
        },
        {
            field: 'name',
            headerName: 'Nome',
            width: 150,
            editable: false,
            disableReorder: true,
            disableColumnMenu: true,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 250,
            editable: false,
            disableReorder: true,
            disableColumnMenu: true,
        },
        {
            field: 'administrator',
            headerName: 'Administrador',
            width: 250,
            editable: false,
            disableReorder: true,
            disableColumnMenu: true,
            type: 'boolean'
        },
        {
            field: 'enterprise',
            headerName: 'Empresa',
            width: 250,
            editable: false,
            disableReorder: true,
            disableColumnMenu: true,
            hide: true
        },
        {
            field: 'edit',
            sortable: false,
            width: 70,
            filterable: false,
            headerName: ' ',
            hide: false,
            disableColumnMenu: true,
            disableReorder: true,
            renderCell: ( params ) => {                
                return (
                    <Tooltip title='Editar'>
                        <IconButton 
                            className={classes.button} 
                            onClick={() => handleOpenEditUser(String(params.id))}
                        >
                            <Edit  className={classes.icon} />
                        </IconButton> 
                    </Tooltip>  
                )
            }
        },
        {
            field: 'send',
            sortable: false,
            width: 70,
            filterable: false,
            headerName: ' ',
            disableColumnMenu: true,
            disableReorder: true,
            renderCell: ( params ) => {                
                return (
                    <Tooltip title='Reenviar e-mail'>
                        <IconButton 
                            className={classes.button} 
                            onClick={() => handleOpenEditUser(String(params.id))}
                        >
                            <Mail  className={classes.icon} />
                        </IconButton>
                    </Tooltip> 
                )
            }
        },
        {
            field: 'delete',
            sortable: false,
            width: 70,
            filterable: false,
            headerName: ' ',
            disableColumnMenu: true,
            disableReorder: true,
            renderCell: ( params ) => {                
                return (
                    <Tooltip title='Excluir'>
                        <IconButton 
                            className={classes.button} 
                            onClick={() => DeleteUser(String(params.id))}
                        >
                            <Delete  className={classes.icon} />
                        </IconButton>
                    </Tooltip> 
                )
            }
        }
    ];

    return (
        <BaseNavbar pageActive='user'>

            <Container>

                <Content>
                 
                    <h2> Usuários </h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <DataGrid
                            className={classes.grid}
                            rows={users ? users : []}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                        />

                        <Button
                            variant="contained"
                            color='primary'
                            type='button'
                            endIcon={<PersonAdd />}
                            onClick={handleOpenDialogCreateUser}
                        >
                            Novo usuário
                        </Button>

                    </Paper>

                </Content>

                <Dialog
                    open={showDialogCreateUser}
                    onClose={handleOpenDialogCreateUser}
                    aria-labelledby='Cadastro de usuário'
                    aria-describedby='Cadastrar novo usuário na aplicação'
                >
                    <DialogTitle>Cadastrar usuário</DialogTitle>
                    <DialogContent>
                        <Form 
                            ref={formRefCreate} 
                            onSubmit={handleSubmitCreateUser}                       
                        >                            
                            <InputGroup>
                                <Input
                                    label='Nome'
                                    name='name'
                                    type='text'
                                />
                                <Input
                                    label='E-mail'
                                    name='email'
                                    type='text'
                                />
                            </InputGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            name='admin'
                                            color='primary'                                            
                                        />
                                    }
                                    label='Administrador'
                                />
                                
                            <InputGroup>
                                
                            </InputGroup>

                            <DialogActions>
                                <Button
                                    variant="outlined"
                                    color='secondary'
                                    type='button'
                                    endIcon={ <Close />}
                                    onClick={handleOpenDialogCreateUser}
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
                    </DialogContent>
                </Dialog>
                
                <Dialog
                    open={showDialogUser}
                    onClose={handleOpenDialogUser}
                    aria-labelledby='Edição de usuário'
                    aria-describedby='Editar usuário na aplicação'
                >
                    <DialogTitle>Cadastrar usuário</DialogTitle>
                    <DialogContent>
                        <Form 
                            ref={formRef} 
                            onSubmit={() => {}} 
                            initialData={selectUserEdit ? {
                                name: selectUserEdit.name,
                                email: selectUserEdit.email,
                                admin: selectUserEdit.admin,
                            }: {}}
                        >
                            
                            <InputGroup>
                                <Input
                                    label='Nome'
                                    name='name'
                                    type='text'
                                />
                                <Input
                                    label='E-mail'
                                    name='email'
                                    type='text'
                                    changeDisable={true}
                                />
                            </InputGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            name='admin'
                                            color='primary'
                                            checked={selectUserEdit?.admin ? true : false}
                                        />
                                    }
                                    label='Administrador'
                                />
                                
                            <InputGroup>
                                
                            </InputGroup>

                            <DialogActions>
                                <Button
                                    variant="outlined"
                                    color='secondary'
                                    type='button'
                                    endIcon={ <Close />}
                                    onClick={handleOpenDialogUser}
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
                    </DialogContent>
                </Dialog>

            </Container>

        </BaseNavbar> 
    );
}

export default User;