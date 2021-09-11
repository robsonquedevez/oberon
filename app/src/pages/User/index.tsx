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

const User: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [showDialogUser, setShowDialogUser] = useState<boolean>(false);
    const [selectUserEdit, setSelectUserEdit] = useState<ISelectUserEdit | null >(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        (
            async () => {
                api.get('/user')
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    enqueueSnackbar(error.message, { variant: 'error' });
                });
            }
        )()
    }, []);

    const handleOpenDialogUser = useCallback(() => {
        setShowDialogUser(!showDialogUser);

        if(!showDialogUser){
            setSelectUserEdit(null);
        }

    }, [showDialogUser]);

    const handleOpenEditUser = useCallback((id: number) => {
        setShowDialogUser(true);

        setSelectUserEdit({
            name: rows[id].name,
            email: rows[id].email,
            admin: false
        });
    }, []);

    const columns: GridColDef[] = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 90,
            editable: false,
            disableReorder: true,
            disableColumnMenu: true,
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
                            onClick={() => handleOpenEditUser(Number(params.id) - 1)}
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
                            onClick={() => handleOpenEditUser(Number(params.id) - 1)}
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
                    <Tooltip title='Reenviar e-mail'>
                        <IconButton 
                            className={classes.button} 
                            onClick={() => handleOpenEditUser(Number(params.id) - 1)}
                        >
                            <Delete  className={classes.icon} />
                        </IconButton>
                    </Tooltip> 
                )
            }
        }
    ];

    const rows = [
        { id: 1, name: 'Jon Snow', email: 'snow@ice.com' },
        { id: 2, name: 'michael scot', email: 'scot@dundermiflin.com' }
    ]

    return (
        <BaseNavbar pageActive='user'>

            <Container>

                <Content>
                 
                    <h2> Usuários </h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <DataGrid
                            className={classes.grid}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                        />

                        <Button
                            variant="contained"
                            color='primary'
                            type='button'
                            endIcon={<PersonAdd />}
                            onClick={handleOpenDialogUser}
                        >
                            Novo usuário
                        </Button>

                    </Paper>

                </Content>

                <Dialog
                    open={showDialogUser}
                    onClose={handleOpenDialogUser}
                    aria-labelledby='Cadastro de usuário'
                    aria-describedby='Cadastrar novo usuário na aplicação'
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