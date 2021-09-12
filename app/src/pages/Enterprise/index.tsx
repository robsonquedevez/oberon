import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import * as Yup from 'yup';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

import Input from '../../components/Input';

import {    
    Container,
    Content,
    InputGroup,
    Loading
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface IEnterprise {
    cnpj: string;
    name: string;
    email: string;
    address: string;
    number: string;
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
                    setBtnLoading(false);
                    const msg = error.response ? 
                    error.response.data.message : 
                    'Erro ao buscar Empresa, Tente novamente.';

                    enqueueSnackbar(msg, { variant: 'error' });
                })
            }
        )();
    }, [enqueueSnackbar, user.enterprise]);

    const handleSubmit = useCallback( async (data: IEnterprise) => {
        setBtnLoading(true);
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                cnpj: Yup.string().required('Campo obrigatório').min(14, 'CNPJ inválido'),
                name: Yup.string().required('Campo Obrigatório'),
                email: Yup.string().email('Email inválido'),
                address: Yup.string(),
                number: Yup.string(),
                district: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                zip_code: Yup.string()
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.put('/enterprise', data);

            enqueueSnackbar('Dados da empresa atualizados com sucesso!', { variant: 'success' });
            setBtnLoading(false);

        } catch (error) {
            setBtnLoading(false);
            if(error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);
                return;
            }

            const msg = error.response ? error.response.data.message : 'Erro ao atualizar dados da empresa. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        }
    }, [enqueueSnackbar]);

    return (
        <BaseNavbar pageActive='enterprise'>

            <Container>

                <Content>
                 
                    <h2> Empresa </h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <Form 
                            ref={formRef} 
                            onSubmit={handleSubmit}
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
                                        type='text'
                                        changeDisable={true}
                                    />
                                    <Input
                                        label='Razão Social'
                                        name='name'
                                        key='name'
                                        type='text'
                                        changeDisable={true}
                                    />                            
                                </InputGroup>
                                <InputGroup>
                                    <Input
                                        label='E-mail'
                                        name='email'
                                        type='text'
                                        key='email'
                                    />                            
                                    <Input
                                        label='Endereço'
                                        name='address'
                                        type='text'
                                        key='address'
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Input
                                        label='Número'
                                        name='number'
                                        type='text'
                                        key='number'
                                    />
                                    <Input
                                        label='Bairro'
                                        name='district'
                                        type='text'
                                        key='district'
                                    />
                                    <Input
                                        label='Cidade'
                                        name='city'
                                        type='text'
                                        key='city'
                                    />
                                    <Input
                                        label='UF'
                                        name='state'
                                        type='text'
                                        key='state'
                                    />
                                    <Input
                                        label='CEP'
                                        name='zip_code'
                                        type='text'
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