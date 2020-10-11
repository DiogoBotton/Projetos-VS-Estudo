import React, { useState, useEffect } from 'react';
import Header from '../../components/header/index';
import Footer from '../../components/footer/index';
import api from '../../services/services';

const Filmes = () => {
    // Explicação: 1° paramêtro se refere à VARIAVEL que será armazenado algum dado, e o 2° paramêtro ao MÉTODO que ATUALIZARÁ o dado.

    // Variavel com matriz de filmes, com o método que atualizará a lista
    const [filmes, updateFilmes] = useState({});

    // Variavel que define se a página esta carregando
    const [isLoading, updateIsLoading] = useState(true)

    // Variavel com string de erro, inicia com string vazia
    const [erro, updateErro] = useState('');

    // O useEffect é parecido com o componentDidMount (executa após a renderização do componente/página), e outros...

    // 1° paramêtro seria a função à ser executada, o 2° paramêtro seria a qual condição será executado
    // com [] (matriz vazia) significa que irá ser executado apenas uma vez (quando a página for carregada)
    // com [conteudo] significa que irá ser executado sempre quando a variavel "conteúdo" houver uma alteração
    useEffect(() => {
        api
            .get('filmes')
            .then(resp => {
                // Caso não dê erro, atualiza lista de filmes
                updateFilmes(resp.data);
                updateIsLoading(false)
            })
            .catch(erro => {
                // Caso dê erro, exibe a mensagem de erro
                updateErro(erro.message);
                updateIsLoading(false)
            })
    }, [])

    // ERRO: Executa o useEffect 4 vezes ou mais
    console.log(filmes)
    return (
        <div>
            <Header description="Filmes da plataforma" />
            <h1>{erro}</h1>
            <Footer />
        </div>
    );
}

export default Filmes;