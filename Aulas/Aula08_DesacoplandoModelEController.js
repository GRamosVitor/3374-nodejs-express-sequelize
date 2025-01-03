/*
    Conforme vimos na aula anterior, precisamos flexibilizar nossos modelos para que eles possam receber regras de negocio especificas, coisa que não é possivel da forma como nosso modelo se encontra. 

    Vamos começar criando, dentro da pasta 'src' uma pasta chamada 'services' e, dentro dessa pasta, um arquivo 'Services.js'. Esse arquivo servirá como camada intermediária (uma subcamadas, conforme visto na aula 5) e será responsável por pegar o modelo, saplicar as regras de negocio e realizar a interface com os controllers
    Como 'Services' vai se comunicar com nosso modelo, precisamos começar importando os modelo em Services
*/
const dataSource = require('../models');
/* 
    Em seguida, criamos a classe Services:
*/
class Services {
    constructor(nomeDoModel){
        this.model = nomeDoModel
    }

    async getAllRegisters() {
        return dataSource[this.model].findAll();
    }
}
/*
    Veja que a classe é bem genérica, podendo receber no seu construtor o nome de qualquer modelo. Antes, no arquivo 'PessoaController.js' tinhamos a chamada 'database.Pessoa.findAll()'. Essa chamada estava muito chumbada, pois funcionava apenas com o modelo 'Pessoa'. Agora que passamos essa responsabilidade para 'Services', dataSource[this.model] pode receber qualquer modelo e esses modelos, quando as classes forem instanciadas, vao passar pelo construtor. Agora temos a classe 'Services' que se conecta com qualquer modelo e que possui o método "findAll", que existe em todos os modelos.

    Agora, criamos um arquivo na pasta 'services' chamado 'PessoaServices.js'. Nesse arquivo, usaremos a herança de classes: 'PessoaServices' extenderá 'Services'. Seu construtor não precisa receber parametros pois tudo o que usaremos virá da classe-mãe. No 'super' do construtor colocamos a string 'Pessoa', que é o nome do nosso modelo.
    Assim, conseguimos criar classes de serviço para cada entidade de negocio, bastando apenas colocar no construtor super o nome do modelo que será usado por aquela entidade.
    Agora, exportamos com module.exports = PessoaServices
*/
class PessoaServices extends Services {
    constructor() {
       super('Pessoa'); 
    }
}
/*
    Agora, com os serviços de 'Pessoa' prontos, precisamos refatorar nosso controller. Na pasta 'controllers' vamos criar uma classe 'Controller.js' que será  classe-mãe de todos nossos controles. Em 'Controller.js' colocaremos a logica
*/
class Controller {
    constructor(entidadeService) {
       this.entidadeService = entidadeService;
    }

    async getAll(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.getAllRegisters();
            return res.status(200).json(listaDeRegistros);
        } catch(erro){
            //erro
        }
    }
}
/*
    Veja que nosso novo controller recebe, no construtor, uma 'entidadeService', que será uma instancia de um dos services que criamos.
    Além disso, temos o método genérico 'getAll', que será responsável por pegar todos os registros de qualquer controle. Como esse método lida com requisições, temos que passar como argumentos 'req' e 'res'. Aqui colocamos a chamada para a database, que antes estava em 'PessoaController.js'. Veja que trocamos 'listaDePessoas' para 'listaDeRegistro', já que agora esse método buscará todos os registros em qualquer modelo. Além disso, 'this.entidadeService.getAllRegisters()' faz a função (de forma dinamica, ou seja, funciona com todos os modelos) que antes era feita por 'database.Pessoa.findAll()' (que era feita de forma estática, ou seja, só funcionava com o modelo 'Pessoa')
    
    Agora, transformamos 'PessoaController.js' numa classe filha de 'Controller.js'
    Para isso, importamos em 'PessoaController.js' nosso controller generico, com o código
    const Controller = require('./Controller.js');
    e importamos o serviço que se conectará com esse controlador, no caso
    const PessoaServices = require('../services/PessoaServices.js').
    Além disso, como não estamos mais trabalhando com métodos estáticos, temos que criar uma instancia de pessoaServices. Veja lógica abaixo
*/
const pessoaServices = new PessoaServices();

class PessoaController extends Controller { 
   constructor() {
    super(pessoaServices);
   }
}
/*
    Perceba que passamos no construtor da classe 'super(pessoaServices)' (que, por sua vez, trás o nome do modelo e os métodos da classe 'Services' mas com o nome 'Pessoa'). Além disso, apagamos as demais linhas de código pois todos os métodos que iremos usar estarão na classe 'Controller' e serão herdados ou na classe 'Services' e serão trazidos por 'super(pessoaServices)'
    Por ultimo consertamos a rota, que antes estava funcionando para classes estaticas. Para isso, criamos no arquivo 'pessoasRoute.js' uma instancia de 'PessoaController' e alteramos a função 'router.get()' para que o segundo argumento desse método seja uma função anonima:
*/
router.get('/pessoas', (req, res) => pessoaController.getAll(req, res));

/*
    Os passos feitos nessa aula, embora tenham sido muitos e complicados, servem para evitar que precisemos escrever muitas linhas de código quando formos fazer os CRUDS das demais entidades, o que no fim facilita nosso trabalho.

    Um ponto que deve ser observado é que, embora os services possam se comunicar com outros controllers, por padrão um controller só se comunica com seu próprio service, por isso fizemos as subclasses de ambos.
    Dessa forma, em regra geral, os controladores ficarão responsáveis apenas por gerenciar as requisições e as respostas, enquanto as demais lógicas ficarão a cargo dos services.
    Na próxima aula terminaremos os métodos desse CRUD
*/
