import React, { useRef, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import { Save, ArrowBack } from '@material-ui/icons'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';

import brand from '../../assets/images/Oberon.svg';
import illustration from '../../assets/images/IllustrationInitial.svg';

import {
    Container,
    Presentation,
    Login,
    Brand,
    Illustration,
    FieldGroup,
    Animate
} from './styles';

interface RegisterFormData {
    cnpj: string;
    corporateName: string;
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
}

const Register: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = useCallback( async (data: RegisterFormData) => {
        setBtnLoading(true);
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                cnpj: Yup.string().required('Campo Obrigatório').min(14, 'CNPJ inválido'),
                corporateName: Yup.string().required('Campo Obrigatório'),
                email: Yup.string().required('Campo Obrigatório').email('Email inválido'),
                name: Yup.string().required('Campo Obrigatório'),
                password: Yup.string().required('Campo Obrigatório').min(6, 'Senha deve ter no mínimo 6 caracteres'),
                passwordConfirmation: Yup.string().oneOf(
                    [Yup.ref('password'), undefined],
                    'Confirmação da senha não confere'
                ),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.post('/enterprise', data);

            enqueueSnackbar('Usuário cadastrado com sucesso!', { variant: 'success' });

            history.push('/');

        } catch (error) {
            setBtnLoading(false);
            if(error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);
                return;
            }

            const msg = error.response ? error.response.data.message : 'Erro ao cadastrar usuário. Tente novamente.';

            enqueueSnackbar(msg, { variant: 'error' });
        }
    }, [history, enqueueSnackbar]);

    return (
        <Container>
            <Presentation>
                <Brand src={brand} alt='Logo Oberon' /> 
                <h2>Faça o monitoramento de equipes <br /> utilizando geolocalização.</h2>
                <Illustration src={illustration} alt='Ilustração página inicial oberon' />
            </Presentation>
            <Login>
                <Animate>
                    <h2>Criar conta</h2>

                    <Link to='/' >
                        <ArrowBack />
                        Voltar para login
                    </Link>

                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <FieldGroup>

                            <Input
                                label='CNPJ'
                                name='cnpj'
                                type='number'
                            />

                            <Input
                                label='Razão social'
                                name='corporateName'
                                type='text'
                            />

                            <Input
                                label='E-mail'
                                name='email'
                                type='email'
                            />

                            <Input
                                label='Usuário'
                                name='name'
                                type='text'
                            />

                            <div className='row'>

                                <Input
                                    label='Senha'
                                    name='password'
                                    type='password'
                                />

                                <Input
                                    label='Confirmar senha'
                                    name='passwordConfirmation'
                                    type='password'
                                />

                            </div>                            

                        </FieldGroup>

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

                    </Form>
                </Animate>
            </Login>
        </Container>
    );
}

export default Register;