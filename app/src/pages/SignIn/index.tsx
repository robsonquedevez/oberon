import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

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

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(() => {
        setBtnLoading(true);
        setTimeout(() => {
            setBtnLoading(false);
            history.push('/home');
        }, 2000);
    }, [history]);

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
                                name='user'
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