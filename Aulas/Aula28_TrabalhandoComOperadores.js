/*
    Da forma como nossa API funciona atualmente, ao consultar as turmas abertas, o cliente recebe todos os dados do banco, incluindo turmas antigas que já não estão mais ativas. Para conseguirmos filtrar os resultados por data, primeiro precisamos conseguir passar para a requisição as datas que a pessoa usuária deseja consultar e, em seguida, fazer com que o Sequelize pegue essas informações e crie um filtro para gente.
    Para passar as informações para a requisição, podemos usar os 'Query params' ou 'parametros de consulta'. Esses parametros são passados através da URL da rota e são sempre um conjunto chave-valor. O inicio dos query params na URL é sempre através de um 
    '?' e cada parâmetro é separado por um '&'. Por exemplo:

    URL/?data_inicial=2023-01-01&data_final=2023-01-01

    Já no sequelize, usaremos os "operadores". Os operadores são funções do prórprio SQL e funcionam de forma semelhante aos operadores aritiméticos e comparativos usandos nas linguagens de programação. Assim, chamamos no controlador responsável pela requisição esses operadores, que farão as comparações que queremos e trarão os dados desejados do DB. O Sequelize possui uma série de operadores, que conversão com os operadores do SQL e estão disponiveis na documentação. Nesse nosso caso, usaremos os operadores [Op.gte] (greater than or equal, ou "maior ou igual") para valores mínimos e [Op.lte](lesser than or equal, ou "menor ou igual") para valores máximos

    Vamos ver a implementação. Como queremos buscar os cursos disponiveis dentro de um certo periodo, vamos escrever o código em 'CursoController.js'

    Para isso, vamos criar um novo método 'pegaCursos'. Assim como fizemos anteriormente, temos que criar uma variavel 'where', mas dessa vez elá será um pouco diferente. Veja:

    const where = {
        data_inicio{
            [Op.gte]: data,
            [Op.lte]: data,
        }
    }

    veja que 'data_inicio' é o nome de uma das colunas da nossa tabela 'cursos' e 'where' é um parâmetro condicional que podemos passar como argumento para os métodos 'finders' (findAll, findOne, etc)
    Aqui, faremos a montagem do objeto 'where' através de condicionais usando padrão ternário, desta forma o método 'pegaCursos' poderá receber um valor minimo ou um valor maximo ou ambos ou nenhum, ficando mais dinamico. Vamos ver a implementação
*/
const { Op } = require('sequelize');
async function pegaCursos(req, res){
    const { data_inicial, data_final } = req.query;
    const where = {}

    //se existirem os param, cria uma propriedade {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //se existir data_inicial, adiciona a prop gte
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //se existir data_final, adiciona a prop lte
    data_final ? where.data_inicio[Op.lte] = data_final : null; 

    try{
        const listaCursos = await cursoServices.pegaTodosOsRegistros(where);
        return res.status(200).json(listaCursos);
    }catch(erro){
        return res.status(500).json({ erro: erro.message })
    }
}

/*
    Como os operadores são do Sequelize, começamos importando esses operadores no controlador, usando 'const { Op } = require('sequelize');'

    Em seguida, dentro do método, criamos as const 'data_inicial' e 'data_final', recebendo os valores passados através de req.query.
    Aplicamos então as condicionais para montar nosso objeto 'where' e, por ultimo, fazemos o try-catch como já estamos acostumados, passando o 'where' como argumento da função 'pegaTodosOsRegistros', vindo do nosso 'Services.js'
    Veja que a análise dessas condicionais podem ser feitas por uma função auxiliar salva em 'utils', mas vamos deixar elas no método 'pegaCursos' por questões didáticas

    Agora, se abrirmos nosso 'Services.js', veremos que o método 'pegaTodosOsRegistros' atualmente não recebe nenhum argumento. Teremos então que refatorar o método:
*/
async function pegaTodosOsRegistros(where = {}) {
    return dataSource[this.model].findAll({ where: {...where}});
}
/*
    Dessa forma, se não forem passados nenhum parametro por req.query, o objeto 'where' fica vazio e, por padrão, o sequelize retornará todos os registros e, se houver parâmetros em req.query, 'where' terá condicionamentos e 'findAll' irá retornar apenas os registros que cumprem esses requisitos.

    Por ultimo, precisamos apenas mudar a chamada da rota em 'cursosRoutes.js'
*/
router.get('/cursos', (req, res) => cursoController.pegaCursos(req,res));
/*
    Finalmente podemos testar a chamada no Postman
*/