/*
    Em algumas situações, uma unica operação precisa realizar alterações em mais de uma tabela no banco de dados, ou seja, o Sequelize precisa acessar mais de um modelo.
    Vamos ver como fazer isso implementando como exemplo uma operação que, ao alterar o cadastro de um estudante para desativado, altere também todas as matriculas relativas a esse estudante automaticamente para "canceladas".

    Para isso, vamos começar abrindo 'PessoaController.js' e escrevendo o método abaixo
*/
async function cancelaRegistroEstudante(req, res){
    const { estudante_id} = req.params;
    try{
        await pessoaServices.cancelaPessoaEMatriculas(Number(estudante_id));
        res.status(200).json({message: `matriculas ref. estudante ${estudante_id} canceladas`})
    }catch(erro){
        res.status(500).json({erro: erro.message});
    }
}
/*
    Podemos ver que o método segue uma estrutura similar ao método de deletar uma pessoa. Em seguida, criamos o método 'cancelaPessoaEMatriculas' em 'PessoaServices.js'. Porém, como agora mexeremos com 'pessoas' e 'matriculas', precisamos "importar" 'MatriculasServices'. Para isso, usamos o construtor da classe, adicionando ao mesmo 'this.matriculaServices = new Services('Matricula'). Dessa forma, 'PessoaServices' vai ter duas instancias de 'Services', uma ligada ao modelo 'Pessoa' e outra ao modelo 'Matricula. Em seguida, podemos escrever o método:
*/
async function cancelaPessoaEMatriculas(estudanteId){
    await super.updateRegister({ ativo: false }, { id: estudanteId});
    await this.matriculaServices.updateRegister({ status: 'cancelado'}, { estudante_id: estudanteId});
}
/*
    Lembrando que o método 'updateRegister' recebe dois argumentos, sendo o primeiro qual parametro deve ser alterado e qual deve ser o novo valor e o segundo é o 'where', que especificamos qual registro deve ser atualizado.
    Na chamada de 'updateRegister' de 'PessoaServices' passamos a propriedade 'ativo' que deve ser mudada para 'false' de todos os registros cujo campo 'id' sejam iguais ao 'estudantesId' e na chamada de 'updateRegister' de 'MatriculasServices' passamos a propriedade 'status' que deve ser mudada para 'cancelado' de todos os registros de matriculas cujo campo 'estudante_id' sejam iguais a 'estudanteId'.

    Agora, só precisamos criar a rota para essa operação
*/
router.put('/pessoas/:estudante_id/cancela', (req, res) => pessoaController.cancelaRegistroEstudante(req, res));
/*
    A funcionalidade já está implementada, mas temos dois problemas:
    o primeiro é que nosso tratamento de erros ainda está muito simples, portanto após cancelar o registro de um estudante, se tentarmos pegar as matriculas do mesmo, termos o erro "Cannot read properties of null (reading 'getAulasMatriculadas')" já que, para conseguirmos ver as matriculas, o campo 'deletedAt' deve ser 'null'. Não iremos nos aprofundar em tratamento de erros nesse curso.
    Outro problema é que algum erro pode acontecer durante o processamento quando trabalhamos com mais de uma tabela e, para evitar que o sistema "quebre" precisamos incluir as chamadas 'transações'.
    Veremos esse procedimento na próxima aula.
*/
