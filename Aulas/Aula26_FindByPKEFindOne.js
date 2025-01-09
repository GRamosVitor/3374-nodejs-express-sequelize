/*
    Agora que jé temos métodos para pegar todas as matrículas e criar novas matrículas, o próximo passo é criar o método para pegar uma unica matricula.
    Atualmente, dentro da nossa classe 'Services.js', temos apenas o método 'pegaUmRegistroPorId', que chama o método 'findByPk', que por sua vez recebe apenas um argumento: o parâmetro 'id'.
    Porém, as matriculas tem, além do seu proprio 'id', o 'estudante_id' também, portanto o Sequelize precisa buscar usando duas informações. Para isso, usaremos um método um pouco mais reutilizável que o método 'findByPk' chamado 'findOne'. Esse método permite que passemos como argumento um objeto que possui a propriedade 'where', que nos permite passar quantas e quais colunas quisermos e o método se encarrega de realizar esse cruzamento. Vamos ver a implementação.

    Em 'Services.js' vamos criar o método 'getOneRegister':
*/
class Services {
    async getOneRegister(where) {
        return dataSource[this.model].findOne({where: {...where}});
    }
}
/*
    Esse método recebe os parâmetros através de 'where' e usa o operado de espalhamento para espalhar os parametros recebidos em um objeto, que é então passado como argumento para a função 'findOne'

    Agora, em 'Controller.js' temos que criar o método para receber e tratar os dados e chamar 'getOneRegister' 
*/
class Controller{
    async getOne(req, res) {
        const { ...params } = req.params;
        try {
            const umRegistro = await this.entidadeService.getOneRegister(params);
            return res.status(200).json(umRegistro);
        } catch (erro){
            return res.status(500).json({ erro: erro.message});
        }
    }
}
/*
    Agora, ao invés de pegarmos apenas o 'id' de 'req.params', criamos a 'const {...params}', que irá usar o operador de espalhamento para espalhar todos os parametros vindos de 'req.params' em um objeto, passando esse objeto para o método 'getOneRegister'.
    Agora, precisamos criar a rota em pessoaRoutes:
*/
router.get('/pessoas/:estudante_id/matriculas/:id', (req, res) => pessoaController.getOne(req, res));
/*
    Agora, embora a rota esteja completa, se fizermos uma requisição get em  '/pessoas/:estudante_id/matriculas/:id' irá ocorrer um erro.
    Isso ocorrerá pois, no nosso 'Controler.js', quando temos 'const { ...params } = req.params' os dados que chegam por 'req.params' vem no formato de string e no nosso modelo tanto 'estudante_id' quanto 'id' são do tipo Number. Para corrigir esse problema, veremos na próxima aula como usar uma função helper.
*/