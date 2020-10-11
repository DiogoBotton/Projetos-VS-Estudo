import React, {useState} from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index'
import './style.css';

function Login() {
  // O useState modifica o estado de algum objeto/componente da página quando o usuário faz algum tipo de ação
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header description="Faça o Login e conheça nossa Coletânea" />
      <div className="centro">
        <div className="login">
          <h1>Login</h1>

          <Input type="text" label="Email" name="email" />
          <Input type="password" label="Senha" name="senha" />

          <Button name="Enviar" onClick={() => setCount(count + 1)}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
