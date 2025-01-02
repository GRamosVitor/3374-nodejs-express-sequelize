/*
    Como já sabemos, banco de dados SQL são relacionais e precisam utilizar a sintaxe própria dessa linguagem para realização das consultas. Embora seja possivel colocar as querys SQL diretamente no código de uma aplicação, é possivel realizar uma abstração dos dados, usando uma ORM (Object Relational Mapping), que cria uma camada de mapeamento de objetos entre aplicação e o modelo relaiconal de uma banco de dados, sendo assim, é possivel que os desenvolvedores trabalhem com bancos de dados como se estivessem lidando com objetos da linguagem de programação que estão usando (no caso, o JavaScript).
    Para esse projeto, usaremos o Sequelize.

    Para instalar o Sequelize na pasta de projetos já iniciada, usamos o comando 

    "npm install sequelize@6.32.1 sequelize.cli@6.6.1 sqlite3@5.1.6 --save-exact"

    isso instala o Sequelize, o Sequelize Cli (que é a ferramenta de linha de comando do sequelize) e a lib do banco de dados que iremos usar, o SQLite3. Os valores após os "@" são as versões das libs instaladas e --save-exact salva no arquivo packase.json exatamente as versões usadas.

    O sequelize Cli será usado para subir um "andaime", uma base de um projeto usando o Sequelize.
    Para isso, usamos o comando

    npx sequelize-cli init

    na raiz do projeto serão criadas as pastas 'config', 'migrations', 'models' e 'seeders' e essas pastas deveem todas ser colocadas na pasta 'src'. Porém, agora, os comandos enviados ao Sequelizer pelo sequelizer-cli normalmente são executados no root e, caso esses comandos não encontrem no root as pastas do sequelize, a aplicação irá quebrar. Para evitar isso, vamos criar, no root, um arquivo chamado '.sequelizerc' com o seguinte código:
*/
const path = require('path');

module.exports = {
    'config': path.resolve('./src/config', 'config.json'),
    'models-path':path.resolve('.src/models'),
    'seeders-path':path.resolve('.src/seeders'),
    'migrations-path':path.resolve('.src/migrations'),
}

/*
    'path' é uma biblioteca nativa do node, que gerencia caminhos de diretório. Dessa forma, 'indicamos' ao sequelize.cli onde estão as pastas que ele precisa acessar.
    Agora, no arquivo 'config.json' precisamos configurar os dados do banco que dados que iremos utilizar.
    Esse arquivo já vem preenchido com os 3 ambientes padrões de desenvolvimento de um app (development, test e production), mas usaremos apenas o primeiro. Aqui devem ser preenchidos os dados do banco que iremos usar. Primeiramente, devemos mudar a propriedade 'dialect' para 'sqlite'. Como o sqlite não precisa de um servidor, pois os dados ficam salvos em um arquivo, apagamos as propriedades 'username', 'password', 'database' e 'host' e adicionamos a propriedade 'storage' com o valor './database.sqlite'
    Esse valor é o caminho do arquivo que servirá como banco de dados. Esse arquivo deve ser criado na pasta root e deve ter o nome 'database.sqlite'
    Um ponto que deve ser observado ao configurar a storage, embora o arquivo 'config.json' esteja dentro da pasta 'models', o sequelize inicia a busca do arquivo pela pasta 'src'. Logo, para chegar ao root, basta retornar um diretório, portanto usamos './database.sqlite' ao invés de '../database.sqlite' (que seria usado caso o Sequelize começasse a busca na pasta onde está o arquivo 'config.json')
    É importante colocar os endereços dos carquivos corretamente pois o SQLite possui, como ferramenta nativa, a função de criar um novo arquivo no local especificado, caso o arquivo procurado não seja encontrado
    
    Agora que as dependencias estão devidamente instaladas e configuradas, podemos começar a criar as entidades do nosso negócio na proxima aula. 
*/