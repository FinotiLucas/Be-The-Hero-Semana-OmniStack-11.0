import React, {useEffect, useState} from 'react';
import './styles.css'

import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import Button from '../../components/Button'
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api'

export default function Profile(){
    const ongName =  localStorage.getItem('ongName')
    const ongId =  localStorage.getItem('ongId')
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => setIncidents(response.data))
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incidents.id !== id))
        }catch{
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"></img>
                <span>Bem Vinda, {ongName}</span>

                <Link className="link" to="/incidents/new">
                    <Button>Cadastrar novo caso</Button>
                </Link>

                <button type="button" className="button-logout" onClick={()=>handleLogout()}>
                    <FiPower height={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(
                    incidents =>(
                        <li key={incidents.id}>
                            <strong>
                                CASO:
                            </strong>
                            <p>
                                {incidents.title}
                            </p>
                            <strong>
                                DESCRIÇÃO:
                            </strong>
                            <p>
                                {incidents.description}
                            </p>
                            <strong>
                                VALOR:
                            </strong>
                            <p>
                                {Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incidents.value)}
                            </p>
                            <button type="button" onClick={() => handleDeleteIncident()}>
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    )
                )}

            </ul>
        </div>
    );
}