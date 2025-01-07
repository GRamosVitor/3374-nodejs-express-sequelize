/*
    Agora, vamos começar a ver funcionalidades extras que vem junto do Sequelize, a começar pela ocultação de registros de uma tabela.
    Para entender melhor o uso de uma ocultação, lembre que toda operação em um bando de dados é definitiva (a não ser que exista backup), ou seja, uma vez excluido o registro, o mesmo não pode ser recuperado.
    Quando lidamos com dados que são muito importantes (como, por exemplo, os dados de 'pessoas' da nossa API) e que, por algum motivo, possam precisar ser recuperados, ao invés de excluir definitivamente do banco o registro em questão, criamos um "marcador" que irá indicar que aquele registro foi "excluido". Dessa forma, métodos de busca não irão retornar aquele registro, como se ele não existisse no banco, mas métodos especificos podem recuperar o registro.

    Esse processo é chamado de "soft delete" e é uma estratégia muito comum quando lidamos com dados. 
    O Sequelize possui uma forma própria de lidar com soft delete que é o atributo de Modelo chamado 'paranoid'.
    Nós vimos no curso anterior que os modelos criados com sequelize possuem o método '.init()' que recebe dois argumentos, o primeiro é um objeto que contém o nome das colunas da tabela e o tipo de dado armazenados nelas e o segundo é um objeto que contém as opções daquela tabela. Para usar o recurso do 'paranoid', basta adicionar nesse segundo objeto a propriedade 'paranoid' com o valor 'true'
*/
Pessoa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'pessoas',
    paranoid: true
  });
  return Pessoa;

/*
    Vamos adicionar essa propriedades a todos os modelos da nossa API.
    Agora que os modelos estão atualizados para conter a propriedade 'paranoid', precisamos adicionar uma coluna referente a essa propriedade em todas as tabelas do nosso banco de dados. 
    Vamos ver como realizar esse processo na proxima aula
*/
