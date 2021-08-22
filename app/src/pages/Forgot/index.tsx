import React, { useRef, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import { Replay, ArrowBack } from '@material-ui/icons';
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

const Forgot: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const handleSubmit = useCallback(() => {
        setBtnLoading(true);
        setTimeout(() => {
            setBtnLoading(false);
            history.push('/');
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
                    <h2>Recuperar senha</h2>

                    <Link to='/' >
                        <ArrowBack />
                        Voltar para login
                    </Link>

                    <Form ref={formRef} onSubmit={handleSubmit}>

                        <FieldGroup>

                            <Input
                                label='E-mail'
                                name='email'
                            />

                        </FieldGroup>

                        <Button
                            variant="contained"
                            color='primary'
                            type='submit'
                            endIcon={
                                btnLoading ?
                                <CircularProgress color='inherit' size={18} />
                                : <Replay />
                            }
                            disabled={btnLoading}
                        >
                            Recuperar
                        </Button>
                    
                    </Form>
                </Animate>
            </Login>
        </Container>
    );
}

export default Forgot;