/*
    Além da validação de email vista na aula anterior, existem outras validações comuns que são cobertas pelas validações do sequelize. 
    Vamos ver alguns casos comuns. Em todos usaremos o arquivo 'pessoa.js'

    - Validação de string (validação de 'nome', por exemplo)
        => numero minimo ou máximo de caracteres/string: o validador 'len' valida o numero máximo ou minimo de caracters de uma string. seu valor é um objeto com as propriedades 'args', que deve ser um array contendo o valor minimo e maximo de caracteres e 'msg', a mensagem que será enviada caso a operação de validação retorne 'false'
*/
            Pessoa.init({
                nome: { 
                type: DataTypes.STRING,
                validate: {
                    len: {
                    args:[3, 30],
                    msg: 'o campo nome deve ter entre 3 e 30 caracteres'
                    }
            }}})
/*
        => validação de CPF
        para essa validação, iremos criar nossa própria função validadora. A lógica função de validação de um cpf pode ser encontrada facilmente na internet. no curso iremos apenas simular a validação, para podermos ver como implementá-la.
        Veja o código:
*/
            Pessoa.init({
            cpf: {
            type: DataTypes.STRING,
            validate: {
            cpfEhValido: (cpf) => {
                if (!isCpfValido(cpf)) throw new Error('numero de cpf inválido')
            //resto do código...
}}}})
/*
        Dentro de 'validate' passamos a função anonima 'cpf', que chama a função 'isCpfValido()' que, por sua vez, irá realizar a validação.  Vamos criar essa função em um arquivo chamado 'validaCpfHelper.js', que deve ser criado em uma nova pasta chamada 'utils' dentro de 'src'
        Essa função irá apenas checar se o numero de caracteres da string 'cpf' é 11 ou não
*/
            module.exports = (cpf) => {
                if(cpf.lemght !== 11) return false;
                return true;
            }
/* 
        Agora, basta importar essa função em 'pessoa.js' com 
        const isCpfValido = require('../../utils/validaCpfHelper.js');
        logo depois de 'use strict';
    
    Validações de outros tipos de dados, como booleans e Numbers estão descritas na documentação do sequelize e podem sem incluidas da mesma forma.

    Um ponto que deve ser atentado é que, além das validações, existe também um recurso chamado 'constraints' que são as restrições. A diferença entre elas é que as validations são processadas pela ORM antes de serem enviadas para o banco de dados, enqnpuanto as constraits são informações que são inseridas no banco de dados e, portanto, devem passar por 'migration' para ter efeito. As constrições são usadas para limitar os dados em um banco de dados, por exemplo fazendo com que cada CPF só possa ser cadastrado uma vez no banco.        
*/