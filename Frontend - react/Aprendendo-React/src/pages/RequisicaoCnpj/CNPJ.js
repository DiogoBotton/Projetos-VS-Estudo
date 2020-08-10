import React from 'react';
import axios from 'axios';

class Cnpj extends React.Component {

    constructor() {
        super();
        this.state = {
            cnpj: "",
            result:  {}
        }
    }

    atualizaEstado = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    async RecuperarInfosCnpj(event) {
        event.preventDefault();

        let cnpj = this.state.cnpj;
        
        //Provavel erro na própria API (Resolução: Acrescentado na startup da API "CorsPolicy")
        await axios.get(`http://localhost:5000/api/Cnpj/receita/cnpj/${cnpj}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                this.setState({
                    result: res.data
                })
                console.log(res.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error);
                }
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.RecuperarInfosCnpj.bind(this)}>
                    <input
                        type="text"
                        value={this.state.cnpj} 
                        name="cnpj"
                        onChange={this.atualizaEstado}/>

                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}

export default Cnpj;