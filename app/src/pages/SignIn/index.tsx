import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup'
import { useSnackbar } from 'notistack';

import { useAuth } from '../../hooks/Auth';
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

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);
    const { signIn } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = useCallback( async (data: SignInFormData) => {
        setBtnLoading(true);
        
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Campo obrigatório'),
                password: Yup.string().required('Campo obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await signIn({ email: data.email, password: data.password });

            setBtnLoading(false);

            history.push('/home');

        } catch(err) {
            setBtnLoading(false);

            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }

            const msg = err.response.data? err.response.data.message : 'Houve um erro ao acessar. Tente novamente.';

            enqueueSnackbar(msg, {variant: 'error'});
        }


    }, [history, signIn, enqueueSnackbar]);

    return (
        <Container>
            <Presentation>
                <Brand src={brand} alt='Logo Oberon' /> 
                <h2>Faça o monitoramento de equipes <br /> utilizando geolocalização.</h2>
                <Illustration src={illustration} alt='Ilustração página inicial oberon' />
            </Presentation>
            <Login>
                <Animate>
                    <h2>Acessar conta</h2>
                    
                    <h6>
                        Ainda não tem conta?
                        <Link to="/register"> Criar Conta</Link>
                    </h6>

                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <FieldGroup>

                            <Input
                                label='Usuário'
                                name='email'
                                type='email'
                            />

                            <Input
                                label='Senha'
                                name='password'
                                type='password'
                            />


                        </FieldGroup>
                        
                        <div>
                            <Link to="/forgot-pass">Esqueci a senha</Link>
                        </div>

                        <Button
                            variant="contained"
                            color='primary'
                            type='submit'
                            endIcon={
                                btnLoading ?
                                <CircularProgress color='inherit' size={18} />
                                : <Send />
                            }
                            disabled={btnLoading}
                        >
                            Acessar
                        </Button>
                    </Form>
                </Animate>
            </Login>
        </Container>
    );
}

export default SignIn;