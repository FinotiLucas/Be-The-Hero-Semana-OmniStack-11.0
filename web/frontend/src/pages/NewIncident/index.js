import React,{useState} from 'react';
import './styles.css'

//import {Link} from 'react-router-dom'
import Button from '../../components/Button'
import logoImg from '../../assets/logo.svg'
import Input, { TextArea } from '../../components/Input'
import {useHistory} from 'react-router-dom';

import BackLink from '../../components/BackLink'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

export default function NewIncident(){

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');
    const ongId =  localStorage.getItem('ongId')
    const history = useHistory();
    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,

        }
        const response = await api.post('incidents', data,{
            headers:{
                Authorization: ongId,
            }
        });
        try {
            alert(`Seu ID é ${response.data.id}`);
            history.push(`/profile/${ongId}`)
        }
        catch(err){
            alert(`Erro no cadastro`);
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para de ajudar a resolve-lo</p>
                    <BackLink to="/profile" >
                        < FiArrowLeft height={16} color="#E02041" />
                        Voltar a home
                    </BackLink>
                </section>
                <form onSubmit={handleNewIncident}>
                    <Input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    >
                    Título do caso</Input>

                    <TextArea
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    >
                        Descrição</TextArea>

                    <Input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    >
                    Valor em reais</Input>

                    <Button>
                        Cadastrar</Button>
                </form>
            </div>
        </div>
    );
}