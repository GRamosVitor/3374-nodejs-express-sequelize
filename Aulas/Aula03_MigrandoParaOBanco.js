/*
    Quando criamos nosso modelo usando o sequelize-cli, um dos arquivos criado foi o arquivo '20250102220127-create-pessoa.js'.
    A sequencia numerica no nome do arquivo é a data de criação do mesmo, junto do horario.
    Esse arquivo é um objeto com dois métodos: 'async up' e o método 'async down'.

    O método 'async up' uma lib interna do sequelizer chamada 'queryInterface' e o método 'createTable' dessa lib, usado para criar uma tabela no banco de dados. O primeiro parâmetro desse método é uma string, que representa o nome da tabela no nosso banco de dados. Perceba que, usando o Sequelizer cli, o nome da tabela foi dado automaticamente como 'Pessoas'. Temos que alterar esse valor para se adequar ao padrão do sql, 'pessoas'. 
    Os próximos argumentos são as propriedades do modelo inseridas por nós através do cli e três outras propriedades:
     - id: Representa o identificador da tabela. Possui algumas propriedades (como allowNull: false) que determinam o comportamento dessa propriedade, além de determinar seu tipo (no caso, uma Integer). Além disso, 'id' possui a propriedade 'primaryKey: true', fazendo dele uma chave primária. Essa informação será importante mais a frente.
     - createdAt: Registra o momento em que o registro foi criado no banco
     - updatedAt: Registra o momento em que o registro foi alterado no banco
    
    'Migração de dados' em SQL normalmente é quando ocorre uma transferencia de dados entre plataformas. Porém, quando falamos de migração com ORM, estamos falando de alterações incrementais e rastreáveis no banco. Isso permite o rastreio das alterações, permitindo a recuperação dos dados em alterações anteriores. 
    Um dos pricipais usos de migração com ORM é coordenar alterações feitas nas tabelas do banco de dados para evitar, por exemplo, que tais alterações sejam sobrescritas umas pelas outras. Pois, diferente das alterações realizadas em bancos NoSQL, alterações SQL não são tão flexiveis.

    Para realizar uma imigração usando o Sequelize, basta usar o comando

    npx sequelize-cli db:migrate

    Para visualizar as alterações feitas no banco existem varias formas, a mais facil é através da extensão 'SQLite' do VSCode. Após instalar a extensão, basta pressionar ctrl + shift + p e selecionar a opção 'SQLite: Open Database'. 
    Caso ocorra um erro 'Parse error near line 4:', abra as configurações de usuario (JSON) usando ctrl+shift+P e adicione a propriedade 
     "sqlite.sqlite3": ".sequelizerc",
    
     Após conseguir abrir a database, perceba que foram criadas duas tabelas:
     pessoas: é a tabela que contém os dados das pessoas no nosso banco de dados, determinados pelo nosso model
     SequelizeMeta: tabela que armazena e gerencia o versionamento dos dados das nossas tabelas.
     Agora que a migração, nossos modelos e o banco estão sincronizados, podemos popular nosso banco com dados, o que faremos na próxima aula.

*/