import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Cnpj from './pages/RequisicaoCnpj/CNPJ'

function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/cnpj" component={Cnpj} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;