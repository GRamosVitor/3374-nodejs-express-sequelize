/*
    Agora, já somos capazes de contar os registros automaticamente. Também é possivel agrupar, nessa contagem, os regitros que pertençam a uma mesma "categoria". Vamos ver como fazer isso implementando uma função na nossa API onde iremos agrupar as matriculas por curso e determinar se o curso está lotado ou não.
    Para isso precisamos refatorar o método 'pegaEContaRegistros' para tornar ele mais genérico. Assim sendo, vamos precisar mexer também nos método 'pegaMatriculasPorEstudante*()' em 'MatriculaController' e 'pegaEContaRegistros()' em 'Services' para que eles continuem funcionando. Vamos ver as alterações:
*/
async function pegaMatriculasPorEstudante(req, res){
    const { estudante_id } = req.params;
    try{
       const listaMatriculasPorEstudante = await matriculaServices.pegaEContaRegistros(
        {  
            where:{
                estudante_id: Number(estudante_id),
                status: 'matriculado'
            },
            limit: 2,
            order:[['id', 'DESC']]
        });
       return res.status(200).json(listaMatriculasPorEstudante)
    }catch(erro){
       return res.status(500).json({erro: erro.message});
    }
}

async  function pegaEContaRegistros(options) {
        return dataSource[this.model].findAndCountAll({ ...options });
}
/*
    Agora o método 'pegaEContaRegistros()' recebe 'options' como argumento, espelhando os conteudos desse objeto como argumento do método 'findAndCountAll()'. Passamos então a criar o argumento 'options' como um objeto no método 'pegaMatriculasPorEstudante()', contendo as opções aceitas pelo método 'pegaEContaRegistros()' de 'Services'. Assim, podemos chamar o mesmo método 'pegaEContaRegistros()' em vários controladores diferentes e, ao crir as 'options' diretamente nesses controladores, o método terá comportamentos diferentes.

    Agora, podemos refatorar o método 'pegaCursosLotados()'
*/

async function pegaCursosLotados(req, res){
    const lotacaoCurso = 2;
    try{
        const cursosLotados = await matriculaServices.pegaEContaRegistros ({
            where: {
                status: 'matriculado'
            },
            attributes: ['curso_id'],
            group: ['curso_id'],
            having: Sequelize.lieteral(`count(curso_id) >= ${lotacaoCurso}`)
            
        });
        return res.status(200).json(cursosLotados);
    }catch(erro){
        return res.status(500).json({erro: erro.message});    
    }    
}
/*
    Como agora podemos montar o objeto 'options' no controlador é exatamente isso que nós fizemos no método 'pegaCursosLotados' pois, para fazer o agrupamento funcionar, é esse objeto que devemos manipular. Veja que, além da propriedade 'where', incluimos outras 3 propriedades.
    'attributes' e 'group' são duas propriedades diretamente ligadas ao agrupamento. 'attributes' é a propriedade que determina qual atributo (qual "coluna") de cada registro deve ser retornado e 'group' determina por qual atributo os registros devem ser agrupados. Para ver a diferença na resposta ao usar cada um desses atributos, comente o atributo e faça uma requisição GET.
    Perceba, entretanto, que a resposta não é exatamente o que queremos já que não estamos tendo como retorno os cursos que estão lotados mas sim a uma lista contendo a contagens de matriculas de cada curso e o id de cada curso.
    É ai que entra a propriedade 'having'. Essa propriedade determina uma condição para o retorno dos resultados, que no nosso caso são cursos que tenham 2 ou mais matriculas. Porém, perceba que essa operação é mais complexa do que uma simples contagem (o sequelize vai ter que agrupar os registros a partir de uma contagem e então checar essa contagem para ver quais grupos tem 2 ou mais resultados e retornar apenas aqueles que satisfiçam a condição) e o ORM não consegue lidar sozinho com essa situação. Sendo assim, teremos que escrever manualmente uma função SQL para ajudar o ORM.
    O SQL, como qualquer outra linguagem, possui variavel, função, etc. A função count() existe no SQL então o que fizemos foi escrever uma função do SQL (`count(curso_id) >= ${lotacaoCurso}`) deixando para o ORM realizar a integração dessa função com a query que fizemos anteriormente no método 'pegaCursosLotados()'.

    Podemos ver o ORM em ação comentando, no método, a linha que tem a propriedade 'having', executando uma requisição e vendo no terminal a consulta SQL gerada:

    Executing (default): SELECT `curso_id`, count(*) AS `count` FROM `matriculas` AS `Matricula` WHERE (`Matricula`.`deletedAt` IS NULL AND `Matricula`.`status` = 'matriculado') GROUP BY `curso_id`;

    Agora, vamos descomentar a linha, fazer a requisição e checar a consulta novamente:
    
    Executing (default): SELECT `curso_id`, count(*) AS `count` FROM `matriculas` AS `Matricula` WHERE (`Matricula`.`deletedAt` IS NULL AND `Matricula`.`status` = 'matriculado') GROUP BY `curso_id` HAVING count(curso_id) >= 2;

    Veja que o ORM adicionou 'HAVING count(curso_id) >= 2;' automaticamente na consulta SQL, fazendo com que o o resultado agora tenha o comportamento desejado de retornar apenas os registros de cursos que tenham contagem de 2 ou mais matriculas

    Outras situações poderão aparecer de consultas que são mais complexas do que as consultas comuns cobertas pelo ORM, nesses casos é possivel escrever manualmente as consultas usando o 'Sequelize.literal()' como fizemos.
*/

