/*
    Escopo é uma limitação que podemos incluir quando lidamos com conjuntos de dados. Isso diminui a quantidade de dados manipulados e pode melhor a performance da API. Vamos considerar, por exemplo, que seja interessante que a API retorne, no método get padrão, apenas registros de 'pessoas' que constam como 'ativas', ou seja, não foram ainda excluidas do banco.
    Nós já trabalhamos com escopo quando realizamos a associação entre pessoas e matriculas mas, nesse caso, usamos um escopo de associação. 

    Agora, veremos como implementar um escopo de modelo.
    Vamos começar abrindo o arquivo 'pessoa.js' em 'models'. Após a propriedade 'paranoid', vamos incluir mais uma propriedade chama 'defaultScope'. Essa propriedade deve ter como valor um objeto e esse objeto deve ter a propriedade 'where', que também é um objeto, onde iremos definir as condições do escopo. No nosso caso, será 'ativo: true'. Agora, só serão buscados os registros que possuam o campo 'ativo' com valor 'true'.

    O escopo de modelo atua apenas no modelo em si e não altera os dados no banco de dados. Ele é muito utilizado para facilitar consultas usuais (por exemplo trazendo apenas os usuários ativos, ou os usuarios de um estado especifico ou situações similares)
*/