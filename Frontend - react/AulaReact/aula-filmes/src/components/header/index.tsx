import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './style.css'
import '../../assets/styles/global.css'

// Interface typescript
interface HeaderProps {
  description: string;
  text?: string;
}

// Arrow Function que usa uma interface que vira com propriedades (props) (typescript) FC: FunctionComponent
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="principal">
      <header>
        <div className="barra">
          <nav className="menu">
            <Link to="/"><img src={logo} alt="Logo Aplicação" className="logo" /></Link>
            <ul>
              <li><Link className="link" to="/">Home</Link></li>
              <li><Link className="link" to="/login">Login</Link></li>
              <li><Link className="link" to="/cadastro">Cadastro</Link></li>
            </ul>
          </nav>
          <h3>{props.description}</h3>
          
          {/* PROPS NÃO OBRIGATÓRIA*/}
          {/* Verifica se a props TEXT existe E se o paragrafo com a props text foi chamada em alguma página */}
          {props.text && <p>{props.text}</p>}
        </div>
      </header>
    </div>
  );
}

export default Header;
