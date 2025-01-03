/*
    Nosso banco já está conectado com o modelo, vamos então popular o banco usando um recurso do cli.
    Os dados iniciais usados para popular um banco de dados para teste são chamados de "seed" e o cli já criou a pasta 'seeders'.
    Vamos gerar um arquivo de seed usando o comando

    npx sequelize-cli seed:generate --name demo-pessoa

    O arquivo criado, assim como os arquivos de migração, possui o data e o momento de criação do mesmo.
    Porém, ao contrário do arquivo de migração, o arquivo de seed é bem generico e deve ser preenchido a mão. Começamos descomentando e apagando os comentários irrelevantes, deixando dentro o método 'async up' o método 'bulkInsert' e no método 'async down', o método 'bulkDelete'.
    Em seguida, alteramos o primeiro argumento dos métodos para o nome da tabela que iremos popular (no caso, 'pessoas'). No método 'bulkInsert' apagamos todo o segundo argumento, substituindo esse argumento pelos dados que estão no arquivo 'seedersPessoas' dentro de 'arquivos-base'. Deixamos o segundo argumento de 'bulkDelete' como está

    Agora, podemos fazer a população dos dados usando o comando

    npx sequelize-cli db:seed:all

    para rodar todos os arquivos de seed. Agora, indo no sqlite explorer, podemos atualizar as tabelas no botao de atualização e, ao clicar na seta ao lado da tabela 'pessoas' podemos realizar uma query para buscar todos os dados do banco, o que retorna nossa tabela 'pessoas' completa.

    Agora podemos começar a programar nossas rotas e nossa API

*/