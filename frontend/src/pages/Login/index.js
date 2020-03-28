import React, { useState } from 'react';
import './styles.css'

import {useHistory} from 'react-router-dom';

import {FiLogIn} from 'react-icons/fi'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import BackLink from '../../components/BackLink'

import api from '../../services/api'




export default function Logon(){

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            history.push(`profile/${id}`)
        }
        catch(err){
            alert(`Erro no Logon`);
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>

                    <Input
                        value={id}
                        onChange={e => setId(e.target.value)}
                    >
                        Email
                    </Input>

                    <Input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    >
                        Senha
                    </Input>

                    <Button>Entrar</Button>


                    <BackLink to="/register" >
                        < FiLogIn height={16} color="#E02041" />
                        Não tenho cadastro
                    </BackLink>

                </form>

            </section>

            <img src={heroesImg} alt="Heroes"></img>
        </div>
    );
}