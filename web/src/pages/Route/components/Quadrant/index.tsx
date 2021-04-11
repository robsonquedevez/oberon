import React, { useState, useCallback } from 'react'

import Button from '../../../../components/Button';
import Input from '../../../../components/Input';

import { 
    Container, 
    BtnClose, 
    ListQuadrant ,
    CreateQuadrant,
    ColletionItem
} from './styles';

interface QuadrantProps {
    onClose: Function;
}

const Quadrant: React.FC<QuadrantProps> = ({ onClose }) => {
    const [ showRegister, setShowRegister ] = useState(false);

    const handleShowResgister = useCallback((value) => {
        setShowRegister(value);
    }, []);

    return (
        <Container className='card'>

            <div className='card-content'>
                <BtnClose onClick={() => {onClose()}}>
                    <i className='material-icons'>close</i>
                </BtnClose>

                {
                    !showRegister &&

                    <ListQuadrant>
                        <h6>QUADRANTES</h6>
                        
                        <div className='overflowY'>

                            <div className='collection'>
                                <ColletionItem> 
                                    <span>NOME QUADRANTE 1</span> 
                                    <i className='material-icons'>visibility</i>
                                </ColletionItem>
                                <ColletionItem > 
                                    <span>NOME QUADRANTE 2</span> 
                                    <i className='material-icons'>visibility</i>
                                </ColletionItem>
                                <ColletionItem > 
                                    <span>NOME QUADRANTE 3</span> 
                                    <i className='material-icons'>visibility</i>
                                </ColletionItem>
                            </div>

                        </div>

                        <Button
                            label='Novo'
                            icon='highlight_alt'
                            color='blue'
                            onClick={() => handleShowResgister(!showRegister)}
                        />

                    </ListQuadrant>

                }
                {
                    showRegister &&

                    <CreateQuadrant>

                        <Input
                            label='Nome Quadrante'
                            icon='task_alt'
                            type='text'                            
                        />

                        <Input
                            label='Funcionário'
                            icon='badge'
                            type='text'                            
                        />

                        <label>Dias de Monitoramento</label>
                        
                        <div className='field-group'>

                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Dom</span>
                            </label>
                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Seg</span>
                            </label>
                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Ter</span>
                            </label>
                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Qua</span>
                            </label>
                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Qui</span>
                            </label>
                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Sex</span>
                            </label>
                            <label>
                                <input type="checkbox" className='filled-in' />
                                <span>Sab</span>
                            </label>
                            
                        </div>

                        <label>Validade</label>
                        <div className='field-group'>
                            <Input
                                label='Início'
                                type='time'        
                                style={{ width: '90%' }}                  
                            />
                            <Input
                                label='Fim'
                                type='time'  
                                style={{ width: '90%' }}                        
                            />
                        </div>

                        <div className='field-group'>

                            <div className="switch">
                                <label>
                                    Inativo
                                    <input type="checkbox" defaultChecked/>
                                    <span className="lever"></span>
                                    Ativo
                                </label>
                            </div>

                        </div>

                        <div className='btn-group'>
                           
                            <Button
                                label='Cancelar'
                                icon='backspace'
                                color='red'
                                onClick={() => handleShowResgister(!showRegister)}
                            />      
                            
                            <Button
                                label='Salvar'
                                icon='save'
                                onClick={() => {}}
                            />

                        </div>
                    </CreateQuadrant>

                }

            </div>
        </Container>
    );

}

export default Quadrant;