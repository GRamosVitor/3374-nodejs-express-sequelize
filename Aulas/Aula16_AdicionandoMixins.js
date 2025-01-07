/*
    Agora que temos todos os CRUDS das nossas tabelas, vamos ver um pouco sobre 'mixins'.
    Mixins é um comportamento presente nas ORM que permite a criação automática de métodos HTTP a partir das associações entre dois modelos.
    Na aula anterior criamos um método 'POST' para criar uma nova mátricula associada a um estudante. Vamos ver agora como fazer um método 'GET' para pegar todas as matrículas associadas ao estudante usando mixin.

    Normalmente, se fossemos pegar todas as matriculas, iriamos no modelo 'matricula.js'. Porém, como vamos pegar as matriculas associadas a um estudante, começamos abrindo nosso modelo 'pessoa.js'

    No método 'associate' de 'pessoa.js' temos um método 'hasMany' que tem como argumento um objeto que tem um atributo foreignKey com a string 'estudante_id'. Nesse objeto vamos adicionar mais duas propriedades: 'scope' e 'as'
    'scope' é um atributo que tem como valor um objeto e esse objeto pode possuir uma série de atributos que, caso se deseje usar, devem ter os mesmos nomes dos atributos do modelo que estamos acessando. Esse atributo 'scope' serve para 'limitar' o retorno do método 'GET' que estamos criando. No exemplo veremos melhor como esse atributo 'scope' funciona.
    Já o atributo 'as' recebe como valor uma string e serve para passarmos um 'apelido' para a tabela que estamos manuseando. Veja como deve ficar o código de 'Pessoa.haMany(models.Matricula)':
*/
Pessoa.hasMany(models.Matricula, {
    foreignKey: 'estudante_id',
    scope: { status: 'matriculado'},
    as: 'aulasMatriculadas'
  });
/*
    Agora, vamos abrir 'PessoaController.js' e vamos criar um método próprio dessa classe, que não será herdado da classe mãe 'Controller.js':
*/

async function pegaMatriculas(req, res){
    const { estudante_id } = req.params;
    try{
       const listaMatricula = await pessoaServices.pegaMatriculasPorEstudante(Number(estudante_id));
       return res.status(200).json(listaMatricula)
    }catch (error){
       //erro
    }
}
/*
    Essa função resebe a requisição e a resposta como argumentos, então salva na constante 'estudanteId' o id vindo nos parametros da requisição. Então chama o método 'pegaMatriculasPorEstudante' (que ainda iremos criar) de 'pessoaServices'. Esse método recebe o 'estudanteId' como argumento, lembrando que devemos converter esse valor em Number, já que ele chega da requisição como string. Perceba que, mesmo trabalhando com 'matriculas' e não 'pessoas', não precisamos importar 'matriculaServices' pois usaremos os mixins para fazer esse manuseio. 

    Agora, abrimos o PessoaServices para criarmos outro método próprio para essa clase:
*/
async function pegaMatriculasPorEstudante(id){
    const estudante = await super.getRegisterById(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
}
/*
    Esse método de serviço primeiro realizar uma busca no banco de dados de 'estudante' e retorna um unico resultado. Em seguida, a partir desse resultado, chamamos o método 'getAulasMatriculadas', que irá retornar todas as matriculas cujo 'scope' (é aqui que entra o 'scope' que definimos em 'pessoa.js') seja verdadeiro (no nosso caso, por enquanto, todas as matriculas que tiverem o campo 'status' com 'matriculado').

    O método 'getAulasMatriculadas' não precisa ser criado pois isso fica a encargo do mixin do sequelize. Esses métodos são construidos automaticamente, usando as definições que colocamos como parametros do método 'hasMany()' em 'pessoa.js' e seu nome é dado usando o apelido que colocamos no atributo 'as', com a diferença que o método sempre começa com 'get' minusculo.

    Com isso, o CRUD básico está terminado. Nas próximas aulas, veremos como continuar melhorando nossa API, adicionando recursos como tratamento de erro e validações de dados.
*/
