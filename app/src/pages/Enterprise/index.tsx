import React, { useEffect, useRef, useState } from 'react';
import BaseNavbar from '../../components/BaseNavbar';
import {
    Paper,
    Button,
    CircularProgress,
    makeStyles
} from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useSnackbar } from 'notistack';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import Input from '../../components/Input';

import {    
    Container,
    Content,
    InputGroup,
    Loading
} from './styles';

interface IEnterprise {
    cnpj: string;
    name: string;
    email: string;
    address: string;
    number: number;
    district: string;
    city: string;
    state: string;
    zip_code: string;
}

const useStyles = makeStyles((theme) => ({
    paperContent: {
        padding: 15,
    }
}));

const Enterprise: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const { user } = useAuth();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [enterprise, setEnterprise] = useState<IEnterprise | null>(null);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        (
            async () => {
                await api.get(`/enterprise/${user.enterprise}`)
                .then(response => { 
                    setEnterprise(response.data.enterprise);
                    setLoading(false);
                })
                .catch(error => {
                    const msg = error.response ? 
                    error.response.data.message : 
                    'Erro ao buscar Empresa, Tente novamente.';

                    enqueueSnackbar(msg, { variant: 'error' });
                })
            }
        )();
    }, [enqueueSnackbar, user.enterprise]);

    return (
        <BaseNavbar pageActive='enterprise'>

            <Container>

                <Content>
                 
                    <h2> Empresa </h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <Form 
                            ref={formRef} 
                            onSubmit={() => {}}
                            initialData={enterprise ? {
                                cnpj: enterprise.cnpj,
                                name: enterprise.name,
                                email: enterprise.email,
                                address: enterprise.address,
                                district: enterprise.district,
                                number: enterprise.number,
                                city: enterprise.city,
                                state: enterprise.state,
                                zip_code: enterprise.zip_code
                            }
                            : {}
                            }
                        >
                            {loading &&
                                <Loading>
                                        <CircularProgress />
                                        <p>Carregando...</p>
                                </Loading>        
                            }
                            { !loading &&
                            <>
                                <InputGroup>
                                    <Input
                                        label='CNPJ'
                                        name='cnpj'
                                        key='cnpj'
                                    />
                                    <Input
                                        label='Razão Social'
                                        name='name'
                                        key='name'
                                    />                            
                                </InputGroup>
                                <InputGroup>
                                    <Input
                                        label='E-mail'
                                        name='email'
                                        key='email'
                                    />                            
                                    <Input
                                        label='Endereço'
                                        name='address'
                                        key='address'
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input
                                        label='Número'
                                        name='number'
                                        key='number'
                                    />
                                    <Input
                                        label='Bairro'
                                        name='district'
                                        key='district'
                                    />
                                    <Input
                                        label='Cidade'
                                        name='city'
                                        key='city'
                                    />
                                    <Input
                                        label='UF'
                                        name='state'
                                        key='state'
                                    />
                                    <Input
                                        label='CEP'
                                        name='zip_code'
                                        key='zip_code'
                                    />
                                </InputGroup>

                                {
                                    user.administrator &&
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
                                }
                            </>
                            }   
                        </Form>

                    </Paper>

                </Content>

            </Container>

        </BaseNavbar> 
    );
}

export default Enterprise;