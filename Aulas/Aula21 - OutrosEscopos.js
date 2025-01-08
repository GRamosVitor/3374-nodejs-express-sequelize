const PessoaServices = require("../src/services/PessoaServices");

/*
    Agora que aprendemos a usar o escopo de modelo e temos o soft delete, vamos criar uma forma da pessoa usuária da nossa API conseguir dar um 'get' mesmo nesses registros excluidos, de forma que esses registros não fiquem 'travados' e não possam ser recuperados.

    No modelo pessoas, depois de 'defaultScope', vamos adicionar mais uma propriedade, desta vez chamada 'scopes'. Ess apropriedade é um objeto que, por sua vez, possui como propriedades os escopos que queremos adicionar. Vamos inserir um escopo 'todosOsRegistros', passando como propriedade um 'where' vazio. Ao fazer isso, o sequelize interpretará como não havendo escopo e irá retornar todos os registros.
    Veja como deve ficar o código em 'pessoa.js'
*/
Pessoa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true,
      }
    },
    scopes: {
      todosOsRegistros: {
        where:{}
      }
    }
  });
/*
    Agora, vamos no nosso 'Services.js' para criar a conexão entre o modelo e o controlador para isso vamos criar um novo método, depois de 'getAllRegisters' chamado 'getRegisterByScope' veja o método abaixo (lembrando que, por ser método, ele não deve ter a declaração 'function'. Só colocamos essa declaração aqui para não dar erro neste arquivo)
*/

async function getRegisterByScope(escopo){
    return dataSource[this.model].scope(escopo).findAll();
}

/*
    Perceba que o método é basicamente identico ao método 'getAllRegisters', com a diferença que chamamos o método 'scope()' primeiro. Esse método recebe o escopo, passado através do argumento da função, e passa para a função 'findAll()', que irá então se comportar de acordo com o escopo recebido. Dessa forma, conseguirmos adicionar uma quantidade qualquer de escopos em qualquer modelo e o método para usá-los será sempre o mesmo.
    Agora, abrimos 'PessoaServices.js' e aproveitamos a orientação a objetos para criar um método especifico nesse serviço. Nesse método, poderiamos passar o escopo como argumento, pegando esse argumento da requisição, mas aqui deixaremos o argumento 'chumbado' no método. Veja:
*/

async function pegaPessoasEscopoTodos(){
    const listaPessoas = await super.getRegisterByScope('todosOsRegistros');
    return listaPessoas;
}

/*
    Veja que passamos como argumento de '.getRegisterByScope' o nome do escopo definido em 'pessoa.js', 'chumbado' no formato de string.
    Agora, precismos apenas criar o controlador e a rota para esse método. Em 'PessoaController.js' vamos criar o método
*/
async function pegaTodasPessoas(req, res){
    try{
        const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
        return res.status(200).json(listaTodasAsPessoas);
    }catch(erro){
        return res.status(500).json({ erro: erro.message });
    }
}
/*
    Por último, precisamos apenas criar a rota
*/
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasPessoas(req, res));
/*
    Lembre=se que essa rota deve ficar depois do get em '/pessoas' mas antes do get em '/pessoas:id', caso contrário, o express reconhecerá 'todos' como um 'id'
*/

