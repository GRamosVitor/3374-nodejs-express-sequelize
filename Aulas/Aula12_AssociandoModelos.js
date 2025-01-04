/*
    As associações no banco, entre tabelas, já estão feitas nas nossas migrações. Agora, precisamos associar nossos modelos.
    Nesse momento, vamos relembrar um pouco sobre associações SQL. Existem, basicamente, 3 tipos de associação:

    - Um para um: É quando existe uma unica relação entre valores, por exemplo, uma unica pessoa para um unico cpf
    - Um para muitos: É quando existe uma relação de um valor para muitos valores, por exemplo, um estudante pode ter varias matriculas mas uma matricula só pode ter um estudante
    - muitos para muitos: É quando existe uma relação de varios valores para varios valores, por exemplo, um curso pode ter varias categorias e uma categoria pode ter varios cursos (não usaremos essa relação no momento)

    É importante entender as relações entre nossos modelos pois, no Sequelize, as relações são realizadas através de métodos que são diretamente correspondentes a essas relações. Além disso, quando vamos associar os modelos, tal associação deve ser feita em 'ambas as pontas' da relação.
    Os métodos do sequelize são 'HasOne', 'BelongsTo', 'HasMany' e 'BelongsToMany'. Vamos ver na pratica como isso fica.

    Começando pelo modelo 'pessoa.js', a associação deve ser feita dentro do método 'static associate(models)'. 
    Os métodos de associação recebem, no mínimo, dois parâmetros: o modelo ao qual ele está associado (passado como models.ModelName) e um objeto contendo propriedades extras para a relação. Dessas propriedades, apenas uma é obrigatória: a propriedade 'foreignKey', ou 'chave estrangeira, que é o identificador usado na relação. Por exemplo, a relação entre 'pessoas' e 'cursos' se dá na coluna 'docente_id' de 'cursos' e essa coluna recebe a chave primária de 'pessoas' que é o 'id'. Logo, o foreignKey da relação é 'docente_id'.

    Veja abaixo como deve ficar o código em 'pessoa.js'
*/
module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
      static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id'
      });
      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id'
      });
    }
  }
  //resto do código...
}

/*
    Agora, como temos que 'amarrar' dos dois lados, vamos ver como fica o código em 'curso.js'
*/
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
 
    static associate(models) {
      Curso.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id'
      });
      Curso.belongsTo(models.Pessoa, {
        foreignKey: 'docente_id'
      });
      Curso.hasMany(models.Matricula, {
        foreignKey: 'curso_id'
      });
    }
  }
  // resto do código...
}

/*
    Veja que, em 'pessoa.js' usamos  'Pessoa.hasMany(models.Curso, { foreignKey: 'docente_id' })' e, em 'curso.js' usamos 'Curso.belongsTo(models.Pessoa, { foreignKey: 'docente_id' })'. 
    Outra forma de ler esses códigos seria "Pessoa tem muitos cursos e a chave estrangeira é docente_id" e "Curso pertence a uma pessoa e a chave estrangeira é docente_id"

    Assim, conseguimos perceber que:
     - devemos usar a mesma chave estrangeira nas duas pontas da associação
     - relação um para muitos: o 'um' usa o método 'hasMany' o 'muitos' usa o método 'belongsTo'
    
    Agora, vamos ver o código de 'matricula.js' e analisar a relação entre 'matriculas' e 'cursos'
*/
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
       static associate(models) {
          Matricula.belongsTo(models.Pessoa, {
            foreignKey: 'estudante_id'
          });
          Matricula.belongsTo(models.Curso, {
            foreignKey: 'curso_id'
          });
        }
    }
// resto do código...
}

/*
    Observe que, nesse caso, a relação um pra muitos agora se da entre 'cursos' (o "um") e 'matriculas' (o "muitos") portanto  'Curso.hasMany(models.Matricula, { foreignKey: 'curso_id' })' e  'Matricula.belongsTo(models.Curso, { foreignKey: 'curso_id' })'

    Por ultimo, temos o codigo de 'categoria.js':
*/
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.hasMany(models.Curso, {
        foreignKey: 'categoria_id'
      });
    }
  }
  //resto do código
}

/*
    Com todas as relações feitas podemos, na proxima aula, realizar as migrações e popular o banco de dados.
*/

