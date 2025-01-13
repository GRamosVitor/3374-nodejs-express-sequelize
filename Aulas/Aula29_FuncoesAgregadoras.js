/*
    Agora que colocamos a filtragem por data nas buscas de cursos, vamos ver como realizar uma contagem dos registros.
    Vamos supor que o cliente deseje que a API seja capaz de contar, por exemplo, quantas matriculas existem em cada curso e saber quais deles estão lotados.
    
    Para isso, vamos realizar a contagem na tabela 'matriculas' e vamos usar o 'estudante_id' como referencia para a contagem.
    Vamos começar abrindo 'MatriculaController.js' e criando o método 'pegaMatriculasPorEstudante':
*/
async function pegaMatriculasPorEstudante(req, res){
    const { estudante_id } = req.params;
    try{
        const listaMatriculasPorEstudante = await matriculaServices.pegaEContaRegistros({
            estudante_id: Number(estudante_id),
            status: 'matriculado'
        })
        return res.status(200).json(listaMatriculasPorEstudante);
    }catch(erro){
        return res.status(500).json({ erro: erro.message })
    }
}
/*
    Começamos pegando da requisição o dado do id do estudante e salvando em 'estudante_id'. Em sequida, chamamos o método 'pegaEContaRegistros' de 'matriculaServices' passando como argumento o estudante_id, que deve ser convertido em 'Number' e o status 'matriculado' para garantir que só serão retornados os dados das matriculas efetivas do estudante, não das matriculas que podem estar canceladas ou encerradas.

    Em seguida, vamos abrir 'MatriculaServices' para criar o método 'pegaEContaRegistros'
*/
async function pegaEContaRegistros(where) {
        return dataSource[this.model].findAndCountAll({where: {...where}});
    }
/*
    Veja que aqui chamamos o método 'findAndCountAll' do Sequelize, que recebe um 'where' como argumento que, no caso, é o objeto que definimos como argumento em 'pegaMatriculasPorEstudante' ({ estudante_id: Number(estudante_id), status: 'matriculado' })

    Esse método retorna um objeto com duas propriedades: a primeira é a contagem de registros que satisfazem as condições que colocamos e a segunda é uma lista contendo os registgros em si.
    Agora, precisamos criar a rota para conseguirmos acessar o método. Temos que lembrar que, como uma matricula está sempre associada a uma pessoa, temos que criar a rota na rota 'pessoaRoutes.js':
*/
router.get('/pessoas/:estudante_id/matriculas/confirmadas', (req, res) => matriculaController.pegaMatriculasPorEstudante(req, res));
/*
    Essa rota deve ser criada depois de '/pessoas/:estudante_id/matriculas/todos' e antes de '/pessoas/:estudante_id/matriculas/:id' pois, devido a forma como o Express é executado, se colocarmos '/pessoas/:estudante_id/matriculas/confirmadas' depois de '/pessoas/:estudante_id/matriculas/:id' o Express irá considerar a string 'confirmadas' como sendo o valor de ':id' ao invés de fazer parte da rota.
    Com a rota retornando corretamente os registros, podemos também limitar a quantidade de registros retornados, além de determinar a ordem na qual eles são apresentados.
    No método 'pegaEContaRegistros' vamos adicionar ao objeto passado como argumento as propriedades 'limit', que limitará a quantidade de registros retornados e 'order', que definirá a ordem na qual esses registros serão apresentados
*/
const obj = {
    where: {...where},
    limit: 2,
    order:[['id', 'DESC']]
}
/*
    Veja que o atributo 'order' recebe um array com 2 parametros: o primeiro é o nome da coluna que será usada no ordenamento e o segundo é uma string contendo o tipo de ordenamento ('DESC' para descentente e 'ASC' para ascendente)
*/