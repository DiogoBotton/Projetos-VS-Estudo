import React from 'react';
import logo from '../../assets/images/logo.png';
import './style.css'
import '../../assets/styles/global.css'

function Header() {
  return (
    <div className="principal">
      <header>
        <div className="barra">
          <nav className="menu">
            <img src={logo} alt="Logo Aplicação" className="logo" />
            <ul>
              <li><a>Perfil</a></li>
              <li><a>Filmes</a></li>
              <li><a>Genero</a></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
