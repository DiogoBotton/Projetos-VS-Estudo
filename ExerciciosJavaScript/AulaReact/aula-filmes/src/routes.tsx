import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Cadastro from './pages/cadastro/index'
import Home from './pages/home/index'
import Login from './pages/login/index'

function Routes() {
  return (
      <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastro" component={Cadastro}/>
      </BrowserRouter>
  );
}

export default Routes;
