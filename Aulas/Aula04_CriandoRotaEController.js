/*
    Agora, vamos criar uma rota e um controller, portanto deixaremos momentaneamente o Sequelizer de lado e vamos trabalhar com o Express.

    Começamos criando em 'src' uma pasta chamada 'controllers' e, nessa pasta, criaremos um arquivo chamado PessoaController.js contendo a lógica basica de um controlador:
*/
class PessoaController {
  static async getAll (req, res) {
    try {
        
    } catch (erro) {

    }
  }
}

/*
    Como estamos usando o a forma nativa do JS para importar e exportar módulos, exportamos esse módulo usando 'module.exports = PessoaController;'

    Agora, criamos a pasta 'routes' dentro da pasta 'src' com o arquivo 'PessoasRoutes.js'. Dentro desse arquivo colocamos a lógica:
*/
const { Router } = require ('express');
const PessoaController = require ('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', PessoaController.getAll);

module.exports = router;

/*
  'Router' é uma lib interna do express responsável pelo gerenciamento de rotas. 
  'PessoaController' é o controller que interagirá com a rota. 
  Em seguida, criamos uma instancia de 'Router', que demos o nome de 'router'. Chamamos o método 'get' então dessa instancia, passando os parametros necessários:
  primeiro a rota (no caso '/pessoas'), em seguida o método desejado do controllerc (no caso 'PessoaController.getAll').
  Então exportamos 'router' usando 'module.exports'  

  Agora, prevendo que nossas rotas crescerão devido À quantidade de elementos da API, já vamos criar o arquivo 'index.js' em 'routes' para gerenciar nossas rotas.
  Após criado o documento, colocamos a lógica:
*/
const express = require ('express');
const pessoas = require('./pessoasRoutes.js');

module.exports = app => {
    app.use(
        express.json(),
        pessoas
    );
};

/*
  Primeiro chamamos o express, criando a const 'express' e usando require. Em seguida, chamamos nosas rotas de pessoa usando 'const pessoas = require('/pessoasRoutes.js')
  Como 'index.js' é o ponto de entrada das rotas, todas as rotas vem aqui e devem ser empacotadas para serem enviadas ao express como um middleware 
  Para isso, exportamos as rotas usando 'module.exports'. Esse modulo será uma função que recebe 'app' e, dentro da função, usamos o método .use() (que é o método do express para usar middlewares), passando como argumentos 'express.json()' (middleware que será responsável por capturar as strings vindas das requisições e trasnformá-las no formato json, para que possam ser usadas pelo express)  e 'pessoas'.
  As demais rotas, futuramente, também serão adicionadas como argumentos dessa função.
  Agora, podemos abrir o arquivo app.js, deletar as funções app.get e app.use desse arquivo e importar a função que acabamos de criar:
*/
const express = require('express');
const routes = require('./routes');

const app = express();
routes(app);



module.exports = app;

/*
  Perceba que, no caminho de 'routes', passamos apenas './routes'. Isso porque, por padrão, o express já acessa o arquivo 'index.js' caso ele esteja presente na pasta.
  O 'app' criado na função que está sendo exportada no 'index.js' de nossas rotas é justamente a constante 'app', ou seja, a instancia do express que será usada, com todas as bibliotecas e métodos.
  Agora que a rota está criada, só falta conectar 'PessoaController.js' com nosso modelo 'pessoa.js', que será feito na proxima aula.
*/
