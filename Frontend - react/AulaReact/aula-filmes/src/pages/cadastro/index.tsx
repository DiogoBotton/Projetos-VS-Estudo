import React from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import Input from '../../components/input/index';
import Button from '../../components/button/index';

function Cadastro() {
  return (
    <div>
      <Header description="Faça o Cadastro para o acesso" />

      <div className="centro">
        <div className="login">
          <h1>Login</h1>

          <Input type="text" label="Nome" name="nome" />
          <Input type="text" label="Email" name="email" />
          <Input type="password" label="Senha" name="senha" />

          {/* <Button name="Enviar" /> */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cadastro;
