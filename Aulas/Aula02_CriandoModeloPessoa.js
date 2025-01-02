/*
    Para trabalharmos com Sequelize, podemos usar o Sequelize-cli para automatizar a criação dos modelos que iremos utilizar. 
    Vamos começar criando o modelo "Pessoa". 
    Para isso, usamos o comando

    npx sequelize-cli model:generate --name Pessoa --attributes nome:string,email:string,cpf:string,ativo:boolean,role:string

    Esse comando criará automaticamente um arquivo 'pessoa.js' na pasta 'models' e um arquivo numerado na pasta 'migrations'. Esse arquivo numerado não será visto nesse momento, vamos retornar a ele mais a frente no curso.

    O arquivo 'pessoa.js' contém a classe criada automaticamente pelo Sequelizer. Por enquanto, não iremos mexer dentro do modelo, com exceção do método 'Pessoa.init'
    Esse método foi criado com os atributos passados na linha de comando. É importante entender que os tipos dos dados usados aqui devem ser nativos no banco de dados que será usado (por exemplo, o tipo de dado 'enum' só existe no PostGres e não pode ser usado em outros bancos). Apesar do Sequelizer ter esses tipos de dados, é necessário ter certeza que o banco escolhido suporta esses tipos.

    Nesse arquivo 'pessoa.js' precisamos também criar um atributo, depois de 'modelName' chamado 'tableName' com o valor 'pessoas'
    Isso acontece pois em SQL o padrão de nomenclatura dita que o nome das tabelas deve ser em letras minusculas e no plural, com palavras separadas por underscore ('_') enquanto no JavaScript as classes devem ter letra maiuscula, separadas por camel-Case. 
    Isso pode gerar problemas quando o Sequelizer for relacionar as tabelas com o nome do modelo. Para prevenir esse comportamento, adicionamos a propriedade 'tableName', definindo o nome das tabelas a serem acessadas. Dessa forma, evitamos as confusões que podem ser causadas pelo Sequelizer, pois ele tenta pluralizar o nome do modelo quando não encontra a tabela referente ao mesmo, além de deixar o código mais claro

*/