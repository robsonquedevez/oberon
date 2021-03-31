import React from 'react';

import Navbar from '../../components/Navbar';

import { Container, Content } from './styles';

const User: React.FC = () => {

    return(
        <Container>
            <Navbar />

            <Content>

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

                <a className="btn-create-user btn-floating btn-large waves-effect waves-ligh" title='Criar'>
                    <i className="material-icons">add</i>
                </a>
                
            </Content>




        </Container>
    );
}

export default User;