/*
    Olhando nosso projeto, percebemos que todos os passos que fizemos até agora para 'pessoas', precisarão ser reproduzidos para 'cursos', 'matriculas' e 'categorias'. Para fazer isso da forma mais organizada possivel, podemos tirar proveito da orientação a objetos. Vamos ver como fazer isso, começando por adicionar em 'PessoaController' a lógica necessária para termos um fluxo completo com o método 'get' na rota '/pessoas'.
    Começamos abrindo 'PessoasController' e importando a seguinte constante:
*/
const database = require('../models');

/*
    Como dentro da pasta 'models' existe o arquivo 'index.js', ao usar 'require' em 'models', estamos associando a 'database' à exportação do arquivo 'index.js'

    Agora, no método 'getAll' de 'PessoaController', colocamos a lógica:
*/
class PessoaController {
    static async getAll (req, res) {
        try {
            const listaDePessoas = await database.Pessoa.findAll();
            return res.status(200).json(listaDePessoas)
        } catch (erro) {

        }
    }
}

/*
    Vamos lembrar que o arquivo 'index.js' em 'models' é responsável por gerenciar todos os modelos da pasta de forma automática, trazendo os métodos do modelo para serem usados com o Sequelize.
  
    const database = require('../models'); executa todo o código presente em 'index.js' e retorna todos os métodos referentes, nesse caso, a 'pessoa.js' (já que, por enquanto, é o unico modelo na pasta) e guarda esses métodos na const 'database'.
    A partir desse momento, 'database' terá uma propriedade com o mesmo nome do modelo (nesse caso, 'Pessoa') e essa propriedade terá nela todos os métodos necessários para interagir com o banco.
    Os métodos disponiveis para manipulação do banco está disponivel na documentação do Sequelize e os parâmetros que podem ser passados em cada método, assim como seu retorno, estão disponiveis na parte de referencia de API da documentação

    Esses métodos pertencem ao Sequelize, mas nós podemos acessá-los através do modelo:
    "O modelo 'Pessoa' disponibilizou para uso do controlador o método FindAll()"

    Agora, temos um fluxo completo e podemos continuar criando os demais fluxos a partir daqui.

    Porém, observe dois problemas:
    - Para realizar o CRUD das demais tabelas, precisaremos também criar rotas e controles para todas elas, o que será trabalhoso. 
    - nosso modelo, da forma como está atualmente, está muito engessado, pois é o modelo 'pronto' do Sequelize e o ideal é ter uma parte no modelo onde seja possivel adicionar regras de negocio diferentes daquelas já adicionadas pelo sequelize

    Nas proximas aulas, veremos como resolver esses problemas através da estrutura do projeto, enquanto continuamos a avançar no nossos CRUDS
*/