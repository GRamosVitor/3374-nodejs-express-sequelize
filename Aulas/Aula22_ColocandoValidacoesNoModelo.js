/* 
    Embora validações possam ser feitas no front end, é ideal que essas validações não sejam restritas ao front end. Mais camadas de proteção garantem que a API seja mais resiliente e menos sujeita a ataques. Seria possivel realizar um tratamento usando javascript puro, pegando a informação do corpo da requisição e usando expressões regulares para realizar esse tratamento, mas o sequelize possui algumas bibliotecas internas que permitem que essas validações sejam feitas diretamente no modelo. Isso porque o SQL possui uma 'constrain', uma "limitação", chamada 'check' que pode ser usada para realizar validações em campos e, se o SQL tem esse recurso, a ORM costuma ter também
    Vamos ver como podemos inserir validações no modelo.

    Vamos começar abrindo o modelo 'pessoa.js'. Nas propriedades da tabela pessoa, no campo 'email', vamos alterar o valor da propriedae para um objeto. Esse objeto terá uma propriedade 'type' com valor 'DataTypes.STRING', e uma propriedade 'validate', que é um objeto, com a propriedade 'isEmail: {args: true, msg: 'formato do email invalido}'
    Isso fará com que o sequelize, ao criar tentar criar um novo registro de 'pessoa', verifique se os dados passados no campo 'email' são, de fato, um email e, caso não seja, retorne a mensagem 'formato do email invalido'
    Veja como deve ficar o código:
*/
Pessoa.init({
    nome: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: 'formato de email inválido'
        }
      }
    },
    cpf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }
  // resto do código...
)

/*
    Vamos ver, em seguida, como criar nossas próprias validações.
*/