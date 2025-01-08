/*
    Agora que nossos modelos tem o atributo 'paranoid', precisamos adicionar uma coluna a todas as tabelas do nosso DB para armazenar os valores desse atributo.
    Seria possivel realizar as alterações usando o sequelize-cli, selecionando as tabelas e adicionando as colunas.
    Porém, vamos ver como fazer isso através das migrações, para que tenhamos um versionamento das alterações.

    Para fazer essa alteração através do ORM, vamos copiar o arquivo 'create-pessoa.js' dentro da pasta 'migrations'. Vamos alterar o nome de 'create-pessoa.js' para 'addcolumn-pessoa.js' e temos que alterar também a sequencia de numeros no inicio do arquivo, que representa a data em que o arquivo foi criado.
    No caso, no momento de criação dessa aula, a sequencia numerica era '20250103220127' (03/01/2025 as 22h01m27s) e vamos alterar para '20250108220127' (08/01/2025 as 22h01m27s). Perceba que, nesse caso, apenas mudamos a data pois só precisamos garantir que a data seja posterior à data de cruiação do arquivo original.

    Dentro do arquivo, iremos realizar algumas modificações:
    - vamos substituir o método '.createTable()' pelo método 'addColumn()'
    - vamos adicionar um segundo argumento, contendo uma string com o nome da coluna a ser adicionada. Por padrão, usamos o nome 'deletedAt', mas pode ser usado qualquer nome (idealmente um nome que seja autoexplicativo)
    - vamos alterar o conteúdo do (agora) terceiro objeto, apagando todas as propriedades mas mantendo o objeto. Dentro desse objeto, adicionaremos as propriedades 'allowNull: true' e 'type: Sequelize.DATE'
    - vamos alterar o nome do método 'dropTable()' para 'removeColumn' e adicionar o segundo argumento 'deletedAt'

    Veja abaixo como deve ficar o código desse arquivo:
*/
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('pessoas', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE 
      });
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('pessoas', 'deletedAt');
    }
  };

/*
    Agora, repetimos o processo de copiar e alterar os arquivos para as demais tabelas. Tendo feitas as alterações, podemos rodar o comando no terminal:

    npx sequelize-cli db:migrate

    Agora, se consultarmos no banco usando o POSTMANN, veremos que a coluna 'deletedAt' já foi incluida. 
    Além disso, se olharmos na query feita ao banco, vemos que foram selecionados todos os registros onde 'deletedAt' é 'null':
    
    Executing (default): SELECT `id`, `nome`, `email`, `cpf`, `ativo`, `role`, `createdAt`, `updatedAt`, `deletedAt` FROM `pessoas` AS `Pessoa` WHERE (`Pessoa`.`deletedAt` IS NULL);
*/