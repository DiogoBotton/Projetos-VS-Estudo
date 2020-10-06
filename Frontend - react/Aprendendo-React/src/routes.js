import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './history'
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Cnpj from './pages/RequisicaoCnpj/CNPJ'
import NotFound from './pages/NotFound/NotFound'

function Routes() {

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/cnpj" component={Cnpj} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default Routes;