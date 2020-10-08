/* 
    EXERCICIO 1:
    Desenvolver uma solução JavaScript que defina que ao chover é necessário tirar as roupas do varal
*/

tempo = {}

tempo.chuva = function(taChuvendoAi) {
    if(taChuvendoAi){
        console.log('Aqui ta chuvendo, tira as roupa do varal')
    }
    else{
        console.log('Ta não, deixa as roupa secando')
    }
}

tempo.chuva(true);

/*
    EXERCICIO 2:
    Desenvolver uma solução JavaScript que defina que pessoas com menos de 18 anos não podem comprar bebida alcoólica.
*/

pessoa = {
    idade: 15,
    altura: 1.5,
}

pessoa.bebidaAlcoolica = function(){
    if(pessoa.idade >= 18)
        console.log('Este pessoa pode beber.')
    else
        console.log('Esta pessoa NÃO pode beber.')
}

pessoa.bebidaAlcoolica();

/* 
    Desenvolver uma solução JavaScript que valide se alguém esta usando blusa de frio apenas em dias frios
*/

/* 
    Desenvolver uma solução JavaScript que tome uma ação baseada no nível de satisfação do cliente
*/

// Adicionar itens num array
function adcLivro(){
    livro.nome = document.getElementById('nome').value;
    // fazer para todas as propriedades

    livros.push(livro);
}