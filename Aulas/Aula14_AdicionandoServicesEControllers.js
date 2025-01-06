/*
    Neste momento, nosso banco de dados está populado com as informações. Precisamos agora apenas criar os fluxos CRUD para as demais tabelas.
    Como nós organizamos o projeto com 4 camadas e usamos herança de classe para trabalhar com 'services' e 'controller', criar essas entidades para as tabelas que faltam ('categorias', 'cursos' e 'matriculas') será uma simples questão de copiar as classes 'PessoaControler.js' e 'PessoaServices.js' e usar essas copias, alterando apenas alguns dados.
    Vamos começar pelos 'services'.
    Copie o arquivo 'PessoaServices.js' e altere o nome desse arquivo cópia para 'CategoriaServices.js'. Dentro desse arquivo altere o nome da classe de 'PessoaServices.js' para 'CategoriaServices.js', o argumento do construtor de 'Pessoa' para "Categoria" e a exportação de 'PessoaServices' para 'CategoriaServices'.
    Repita os mesmos passos para 'cursos' e 'matriculas'

    Agora, vamos criar os 'controllers'
    Começamos copiando o arquivo 'PessoaController.js' e renomeando para 'CursoController.js'.
    Dentro desse arquivo, substituiremos todas as menções a arquivos relacionados ao modelo 'Pessoa' por arquivos relacionados ao modelo 'Curso'. Confira abaixo o codigo da classe 'CursoController.js' e compare com 'PessoaController.js' para ter noção melhor dos locais alterados.
*/
const Controller = require('./Controller.js');
const CursoServices = require('../services/CursoServices.js');

const cursoServices = new CursoServices();

class CursoController extends Controller { 
   constructor() {
    super(cursoServices);
   }
}

module.exports = CursoController;

/*
    Agora, repetimos esse processo para criar as classes 'CategoriaController.js' e 'MatriculaController.js'
*/