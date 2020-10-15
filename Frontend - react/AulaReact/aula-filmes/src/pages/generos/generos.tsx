import React, { useState, useEffect } from 'react';
import api from '../../services/services';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index';
import Theater from '../../assets/images/theater.png'
import './style.css'

function Generos() {
  const [genero, setGenero] = useState('');
  const [idGenero, setIdGenero] = useState(0);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const init = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token-usuario'),
        'Content-Type': 'application/json'
      },
    }

    api
      .get('Generos', init)
      .then(resp => {
        setGeneros(resp.data);
      })
      .catch(erro => console.log(erro))
    }, [])

  const listar = () => {
    return(
      <tbody>
        {/*generos.map(genero => (
          <td key={genero.idGenero}>{genero.nome}</td>
        ))*/}
      </tbody>
    );
  }

  return (
    <div>
      <Header description="Generos" />

      <h1>Gêneros</h1>
      <div className="img-theater">
        <img src={Theater} alt="Theater" />
      </div>

      <h3>Lista de Gêneros</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <th scope="col">#Id</th>
            <th scope="col">Gênero</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </thead>

        </table>
      </div>

      <Footer />
    </div>
  );
}

export default Generos;
