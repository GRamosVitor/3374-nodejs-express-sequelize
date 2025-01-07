/*
    Antes de começar-mos a agregar mais funcionalidades na nossa API, vamos revisar a organização de nosso projeto. Com o intuito de separar melhor os arquivos pertencentes a cada camada (lembrando que temos, atualmente, 4 camadas: rotas, controladores, serviços e banco de dados, além do ponto de entrada da nossa API, o app.js)

    Para fazer isso, dentro da pasta 'src' crie uma pasta chamada 'database' e transfira as pastas 'config', 'migrations', 'models', 'seeders' e crie a pasta 'storage'. 'config', 'migrations', 'models' e 'seeders' são todas pastas que contém arquivos relacionados diretamente com o banco de dados e 'storage' é a pasta para onde iremos transferir o arquivo da nossa database propriamente dita, o arquivo 'database.sqlite'.

    Agora, temos que realizar algumas alterações nos documentos que usam esses documentos que alteramos, para que o programa não se perca pelo caminho.
    
    Vamos começar abrindo o arquivo 'config.json' dentro da pasta 'config' e vamos alterar o valor da propriedade 'storage' do ambiente 'development' para

    "./src/database/storage/database.sqlite"

    Em seguida, vamos abrir o arquivo 'Services.js' e alterar no import o arqgumento do método 'require()' para
    
    '../database/models'
    
    Por ultimo, abrimos o arquivo .sequelizerc (que é usado pelo sequelize-cli) e alteramos todos os caminhos para incluir a pasta 'database':

    module.exports = {
        'config': path.resolve('./src/database/config', 'config.json'),
        'models-path':path.resolve('./src/database/models'),
        'seeders-path':path.resolve('./src/database/seeders'),
        'migrations-path':path.resolve('./src/database/migrations'),
    }

    Agora que corrigimos os caminhos após essa pequena refatoração, vamos introduzir nos métodos do nosso 'Controller.js' e do 'PessoaController.js' um tratamento de erro genérico, para nos ajudar a tratar possiveis erros que possam acontecer durante a implementação das proximas funcionalidPessoaades.

    Vamos começar abrindo o arquivo 'Controller.js e, em cada iteração de bloco 'catch', adicione o código
    */
    
    return res.status(500).json({ erro: erro.message});

/*
    Faça o mesmo no método de 'PessoaController.js'.
    Dessa forma, qualquer erro que acontecer durante a requisição mostrará uma mensagem no terminal, facilitando a analise do bug
*/