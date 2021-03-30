import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logoOberon.svg';
import illustration from '../../assets/IllustrationInitial.svg';

import { Container, ContentIllustration, ContentForm, Logo, Illustration } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
    const history = useHistory();

    const handleSubmit = useCallback(() => {
        history.push('/dashboard');
    }, []);

    return (
        <Container>

            <ContentIllustration>
                <div>

                    <Logo src={logo} alt='Logo Oberon'/>

                    <div>
                        <h4>Faça o monitoramento de equipes utilizando geolocalização.</h4>
                    </div>

                </div>

                <Illustration src={illustration} alt='Ilustração' />

            </ContentIllustration>

            <ContentForm>
                <h2>Acessar Oberon</h2>
                <span>Ainda não tem conta? <a href="#"> Criar Conta </a></span>

                <div>
                    <Input label='Usuário' icon='person' type='text' />
                    <Input label='Senha' icon='password' type='password' />
                    <a href="#">Esqueceu a senha?</a>
                    <Button label='Acessar' icon='login' isLoading={true} onClick={handleSubmit} />
                </div>
            </ContentForm>

        </Container>
    );
}

export default SignIn;