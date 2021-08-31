import React, { useRef, useState } from 'react';
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

import Input from '../../components/Input';

import {    
    Container,
    Content,
    InputGroup
} from './styles';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        padding: 15,
    }
}));

const Enterprise: React.FC = () => {
    const classes = useStyles();
    const formRef = useRef<FormHandles>(null);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    return (
        <BaseNavbar pageActive='enterprise'>

            <Container>

                <Content>
                 
                    <h2> Empresa </h2>

                    <Paper elevation={3} className={classes.paperContent}>

                        <Form ref={formRef} onSubmit={() => {}}>

                            <InputGroup>
                                <Input
                                    label='CNPJ'
                                    name='cnpj'
                                />
                                <Input
                                    label='Razão Social'
                                    name='name'
                                />                            
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    label='E-mail'
                                    name='email'
                                />                            
                                <Input
                                    label='Endereço'
                                    name='address'
                                />
                            </InputGroup>
                            <InputGroup>
                                <Input
                                    label='Número'
                                    name='number'
                                />
                                <Input
                                    label='Bairro'
                                    name='district'
                                />
                                <Input
                                    label='Cidade'
                                    name='city'
                                />
                                <Input
                                    label='UF'
                                    name='state'
                                />
                                <Input
                                    label='CEP'
                                    name='zip_code'
                                />
                            </InputGroup>

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

                    </Paper>

                </Content>

            </Container>

        </BaseNavbar> 
    );
}

export default Enterprise;