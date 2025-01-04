/*
    Agora que já organizamos nosso projeto, podemos criar os demais modelos que faltam.
    Nesse momento, é importante notar que algumas tabelas referenciam outras. Perceba que uma pessoa pode ter varias matriculas, uma categoria pode pertencer a varios cursos e que existem relações entre tableas.
    Isso significa duas coisas: Primeiro que precisamos criar os modelos na ordem em que eles são necessários, ou seja, não podemos criar um modelo A que depende de outro modelo B se esse modelo B ainda não foi criado. No nosso caso, podemos ver que a tabela 'categorias' não depende de nenhuma outra, portanto este deve ser o segundo modelo criado. Em seguida criaremos o modelo da tabela 'cursos' pois essa depende da tabela 'pessoas' e da tabela 'categorias' e, por ultimo, criaremos o modelo da tabela 'matriculas' pois esse depende de 'pessoas' e 'cursos'
    A segunda coisa é que, depois de criados os modelos, precisamos indicar a relação entre eles antes de realizar a migração para o banco de dados.

    Vamos começar criando os modelos. Para isso, assim como foi com o modelo "Pessoa", iremos usar o sequelize-cli para realizar esse processo.
    Para criar o modelo 'Categoria' use o comando:

    npx sequelize-cli model:generate --name Categoria --attributes titulo:string

    Em seguida, para criar o modelo 'Curso', use o comando:
    
    npx sequelize-cli model:generate --name Curso --attributes titulo:string,descricao:string,data_inicio:dateonly

    Observe que na linha de cima não passamos as relações entre as tabelas, isso será feito no vs code depois. Além disso, para o atributo 'data_inicio' usamos o tipo do Sequelize 'dateonly', dessa forma salvamos apenas a data, sem o horario.
    Por ultimo crie o modelo 'Matricula' através do código

    npx sequelize-cli model:generate --name Matricula --attributes status:string

    Criado os modelos e as migrations, temos que lembrar de colocar os nomes corretos das tabelas nos arquivos criados. Assim, nos arquivos de migração, vamos substituir as strings de nos métodos 'createTable' e 'dropTable' de cada migration para 'categorias', 'cursos' e 'matriculas' respectivamente.
    Nos modelos, após 'modelName' vamos incluir, em cada um, a propriedade 'tableName' com o nome da tabela daquele modelo.

    Feito isso, podemos começar a fazer as relações entre as tabelas, tópico que veremos na próxima aula.
*/