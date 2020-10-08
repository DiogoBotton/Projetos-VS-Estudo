var nomes = [
    "Jão",
    "Caique",
    "Priscila"
]

var alunos = []

var materias = [
    'Matemática',
    'Portugues',
    'História',
    'Geografia'
]

var aulas = []

// ForEach para acrescentar alunos
nomes.forEach(function AddAluno(nome) {
    let aluno = {
        nome: "",
        email: ""
    }

    aluno.nome = nome;
    aluno.email = nome + '@email.com'
    alunos.push(aluno);
})

// ForEach para acrescentar alunos (duas formas diferentes para apenas exemplificar)
materias.forEach(AddAula)

function AddAula(materia) {
    let aula = {
        materia: {},
        professor: "",
        alunos: []
    }

    aula.alunos = alunos;
    aula.materia = materia;
    aula.professor = 'Caique Zaneti';
    aulas.push(aula);
}

// Utilizando MAP para devolver uma lista de matérias, dentro de aulas

var materiasAulas = aulas.map(function (aula) {
    return aula.materia;
})

console.log('Matérias das aulas: ' + materiasAulas);

// Retorna aluno(s) pelo nome
var filtro = alunos.filter(function (aluno) {
    return aluno.nome.includes('Pri')
})

console.log(filtro);

var alunoBuscado = alunos.find(function (aluno) {
    return aluno.nome === 'Jão'
})

console.log(alunoBuscado);

// ---------------------------------------------------------------------------------------------------------------------------------

// Declarando nova lista de alunos para ser usada a propriedade idade
var alunos2 = [
    {
        nome: 'joão',
        idade: 18
    },
    {
        nome: 'maria',
        idade: 20
    },
    {
        nome: 'pedro',
        idade: 15
    }
];

// Tds os alunos são maior de idade?
var alunosDiMaio = alunos2.every(function (aluno) {
    return aluno.idade >= 18
})

console.log(`Todos os alunos são di maió? ${alunosDiMaio ? 'Sim' : 'Não'}`)

// Existe algum aluno di menó?
var alunosDiMeno = alunos2.some(function(aluno){
    return aluno.idade < 18
})

console.log(`Tem algum di menó? ${alunosDiMeno ? 'Sim' : 'Não'}`)

// Somanto todos os números do array
var num = [1,2,3,4,5,6];

var soma;

var somaTotal = num.reduce(function(soma,n){
    return soma + n
}, 0)

console.log(somaTotal);