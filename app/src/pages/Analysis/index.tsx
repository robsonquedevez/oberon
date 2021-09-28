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
    Input as SelectInput
} from '@material-ui/core';
import {

} from '@material-ui/icons';

import api from '../../services/api';
import {
    useAuth
} from '../../hooks/Auth';

import BaseNavbar from '../../components/BaseNavbar';

import {
    Container,
    Search
} from './styles';


const useStyles = makeStyles((theme) => ({
    paperContent: {
        padding: 15,
    },
    selectForm: {
        width: '70%',
    },
}));

interface User {
    id: string;
    name: string;
}

const Analysis: React.FC = () => {
    const { user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const classes = useStyles();
    const [users, setUsers] = useState<User[]>([]);

    const [userSelect, setUserSelect] = useState<string | null>(null);

    useEffect(() => {
        (
            async () => {
                api.get(`/user/${user.enterprise}`)
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {

                })
            }
        )()
    }, []);

    const handleChangeSelectUser = useCallback((event) => {
        setUserSelect(event.target.value as string);
    }, []);

    return (
        <BaseNavbar pageActive='analysis' > 
            <Container>
                
                <Search>

                    <h2>Análises</h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <Form ref={formRef} onSubmit={() =>{}}>

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

                        </Form>

                    </Paper>

                </Search>

            </Container>
        </BaseNavbar>
    );
}

export default Analysis;