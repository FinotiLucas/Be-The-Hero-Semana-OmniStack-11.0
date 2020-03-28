import React, {useEffect, useState} from 'react';
import './styles.css'

import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import Button from '../../components/Button'
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api'
import InfiniteScroll from 'react-infinite-scroller';

export default function Feed(){
    const ongName =  localStorage.getItem('ongName')
    const ongId =  localStorage.getItem('ongId')
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);


    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [idLast, setIdLast] = useState(false);

    async function loadIncidents(){

      if(loading){
        return;
      }
      if(total > 0 && incidents.length === total){
        return;
      }
      setLoading(true);

      const response = await api.get('incidents', {
        params:{page}
      })

      setIncidents([...incidents, ...response.data]);
      setTotal(
        response.headers['x-total-count']
      )
      setPage(page + 1)
      setLoading(false);
    }

    useEffect(() => {
      loadIncidents()
    },[]);



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

            <div className="naviagtion">

                <Link className="link" to="/feed">
                    <button type="button" className="button" onClick={()=>handleLogout()}>
                        Meus Casos
                    </button>
                </Link>

                <div className="padding"/>

                <Link className="link" to="/profile">
                <button type="button" className="button" onClick={()=>handleLogout()}>
                    Todos os Casos
                </button>
                </Link>

            </div>
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
                            </li>
                        ),
                    )}
                </ul>


            <InfiniteScroll
                pageStart={0}
                loadMore={() => loadIncidents}
                hasMore={false}
                loader={<div className="loader" key={incidents.id}>Carregando ...</div>}
                useWindow={false}
            >

            </InfiniteScroll>

            <Button
                onClick={() => loadIncidents()
            }
            >Ver Mais</Button>
        </div>
    );
}