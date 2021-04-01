import React, { useState } from 'react';
import Modal from 'react-modal';

import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content } from './styles';

const User: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <Container>
            <Navbar />

            <Content>
                
                <Button 
                    color={modalOpen? 'red' : ''}
                    circle={true}
                    icon={modalOpen? 'close' : 'add'}
                    title='Criar' 
                    onClick={() => setModalOpen(!modalOpen)}
                 />

                <div className="card" style={{ width: '100%',  }}>                    
                    <div className="card-tabs">
                        <ul className="tabs tabs-fixed-width">
                            <li className="tab">Cadastro de usuários</li>
                        </ul>
                    </div>
                    <div className="card-content lighten-4">
                        <ul className="collection">

                            <li className="collection-item">
                                <div>
                                    Nome: <strong> Fulano </strong>
                                </div>
                                <div>
                                    E-mail: <strong> email@email.com.br </strong>
                                </div>
                                <div>
                                    <a href="#" className='edit_user' title='Editar'>
                                        <i className="material-icons">edit</i>
                                    </a>
                                    <a href="#" className='delete_user' title='Excluir'>
                                        <i className="material-icons">delete</i>
                                    </a>
                                </div>
                            </li>
                            
                            <li className="collection-item">
                                <div>
                                    Nome: <strong> Fulano </strong>
                                </div>
                                <div>
                                    E-mail: <strong> email@email.com.br </strong>
                                </div>
                                <div>
                                    <a href="#" className='edit_user' title='Editar'>
                                        <i className="material-icons">edit</i>
                                    </a>
                                    <a href="#" className='delete_user' title='Excluir'>
                                        <i className="material-icons">delete</i>
                                    </a>
                                </div>
                            </li>
                            
                            <li className="collection-item">
                                <div>
                                    Nome: <strong> Fulano </strong>
                                </div>
                                <div>
                                    E-mail: <strong> email@email.com.br </strong>
                                </div>
                                <div>
                                    <a href="#" className='edit_user' title='Editar'>
                                        <i className="material-icons">edit</i>
                                    </a>
                                    <a href="#" className='delete_user' title='Excluir'>
                                        <i className="material-icons">delete</i>
                                    </a>
                                </div>
                            </li>
                            
                        </ul>                        
                    </div>
                </div>

                
               
                <Modal
                    isOpen={modalOpen}
                    style={{ 
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60%'                     
                        }
                    }}
                >
                    <form action="">

                        <div className='row'>
                            <div className='input-field' style={{ display: 'flex', alignItems: 'center' }}>
                                <Input label='Nome' icon='person' type='text' />
                                <Input label='E-mail' icon='mail' type='text' />
                            </div>
                        </div>

                        <div>
                            <Input label='Função' icon='badge' type='text' />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div className="switch">
                                <label>
                                    Inativo
                                    <input type="checkbox" defaultChecked/>
                                    <span className="lever"></span>
                                    Ativo
                                </label>
                            </div>
                            <Button 
                                label='Salvar'
                                icon='save'
                                title='Salver'
                            />
                        </div>

                    </form>
                </Modal>

            </Content>

        </Container>
    );
}

export default User;