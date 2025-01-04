/*
    Agora que temos nossas migrações feitas, podemos realizar a associação entre elas. Essa associação é feita através de uma propriedade que iremos adicionar nas propriedaes já existentes nas nossas migrações. Na migração 'curso' iremos adicionar as propriedades 'categoria_id' e 'docente_id' e na migração 'matricula' adicionaremos as propriedades 'estudante_id' e 'curso_id'.
    Essas propriedades, assim como as demais propriedades das migrações, serão objetos que irão ter seus proprios atributos. Hoje nós usaremos as propriedades 'allowNull' (que permite, ou não, a criação de um registro caso o valor daquela propriedade seja nulo), 'type' (que determina o tipo da propriedade) e 'references' (que determina a referencia de onde virá aquele valor, ou seja, é nessa propriedade que determinamos as associações entre tabelas). Como 'references' é o local onde realizamos a associação entre o modelo que estamos criando e outra tabela, essa propriedade também é um objeto que possui no minimo duas propriedades: 'model', que deve ter o nome da tabela de onde virá o valor (aqui, um ponto importante: Apesar do nome da propriedade ser 'model' o valor atribuido a ela deve ser o NOME DA TABELA e não do modelo. Por isso no nosso caso colocamos 'pessoas', por exemplo) e 'key' que deve conter o nome da chave pela qual será feita a ligação (aqui outra observação: embora possamos usar o nome de qualquer coluna da tabela-referencia como chave, costuma-se utilizar como "valor padrão" o 'id', já que cada id é unico para cada registro)
    Veja como devem ficar cada código
*/
    // curso
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('categorias', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        titulo: {
            type: Sequelize.STRING
        },
        descricao: {
            type: Sequelize.STRING
        },
        data_inicio: {
            type: Sequelize.DATEONLY
        },
        docente_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references:{ model: 'pessoas', key: 'id' }
        },
        categoria_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references:{ model: 'categorias', key: 'id'}
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('categorias');
    }
    };

    //matricula
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('matriculas', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        },
        estudante_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: { model: 'pessoas', key: 'id'}
        },
        curso_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: { model: 'cursos', key: 'id'}
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('matriculas');
    }
};

/*
    Agora falta apenas associar os modelos e podemos realizar as migrações para o banco de dados.
*/