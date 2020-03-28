import React, { useState } from 'react';
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import {useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input, { TextArea } from '../../components/Input'
import BackLink from '../../components/BackLink'

import api from '../../services/api'

export default function Register(){

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[description, setDescription] = useState('');
    const[whatsapp, setWhatsapp] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        //const response = await api.post('ongs', data);

        try {
            //alert(`Seu ID é ${response.data.id}`);
            //history.push('/')
        }
        catch(err){
            //alert(`Erro no cadastro`);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Editar Perfil</h1>
                    <p>Edite o seu perfil, nos conte mais sobre a sua causa e mantenha suas informações atualizadas </p>
                    <BackLink to="/" >
                        < FiArrowLeft height={16} color="#E02041" />
                        Voltar ao perfil
                    </BackLink>
                </section>
                <form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    >
                        Nome da sua ONG
                    </Input>

                    <Input
                        type="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    >
                        Email
                    </Input>

                    <Input
                        type="text"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    >
                        Whatsapp

                    </Input>

                    <TextArea
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    >
                        Fale um pouco mais sobre a sua causa
                    </TextArea>


                    <div className="input-group">
                        <Input
                            type="text"
                            value={city}
                            onChange={ e => setCity(e.target.value)}
                        >
                            Cidade
                        </Input>

                        <Input
                            type="text"
                            value={uf}
                            onChange={ e => setUf(e.target.value)}
                            style={{width: 80}}
                        >
                            UF
                        </Input>

                    </div>
                    <Button>Cadastrar</Button>
                </form>
            </div>
        </div>
    );
}