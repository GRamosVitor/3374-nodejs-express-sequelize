/*
    Agora podemos finalizar o CRUD fazendo os métodos PUT e DELETE. Os métodos updates e deletes gerados pelo Sequelize também são métodos que recebem um objeto que tem um 'where' como parâmetro. Dessa forma, podemos repetir os passos da aula anterior para criar essas rotas, reaproveitando os códigos que escrevemos anteriormente.
    Começando pelo PUT, iniciamos criando a rota em 'pessoasRoutes.js'
*/
router.put('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.atualiza(req, res));
/*
    Agora, em 'Services.js', perceba que o método 'updateRegister' recebe um 'id'. Vamos mudar para que o segundo argumento seja  'where' e que ele seja espalhado dentro de '.update'. Veja
*/
class Services {
 async updateRegister(dadosAtualizados, where) {
        const listaDeregistrosAtualizados =  dataSource[this.model].update
        (dadosAtualizados, {
          where: { ...where }
        });
        if (listaDeregistrosAtualizados[0] === 0){
            return false;
        } else {
            return true;
        }
    }
}
/*
    Agora, em Controller.js, podemos fazer as alterações para que o método 'atualiza' possa receber varios parametros, tratar e passar para a variavel 'where'
*/
class Controller {
    async atualiza(req, res) {
        const { ...params } = req.params;
        const where = converteId(params)
        const dadosAtualizados = req.body;
        try{
            const isAtualizado = await this.entidadeService.updateRegister(dadosAtualizados, where);
    
            if(!isAtualizado){
                return res.status(400).json({mensagem: 'Registro não atualizado'})
            }
            return res.status(200).json({message: 'Atualizado com sucesso'});
        } catch(erro) {
            return res.status(500).json({ erro: erro.message});
        }
    }
}
/*
    Agora, falta apenas o delete, onde podemos repetir os passos:
    1 - criar a rota
*/
router.delete('/pessoas/:estudante_id/matriculas/:id', (req, res) => matriculaController.excluir(req, res));
/*
    Atualiza o método em 'Services.js'
*/
async function deleteRegister(where) {
    return dataSource[this.model].destroy({ where: {...where} });
}
/*
    E atualiza o método em 'Controller.js'
*/
async function excluir(req, res){
    const { ...params } = req.params;
    const where = converteId(params)
    try{
        await this.entidadeService.deleteRegister(where);
        return res.status(200).json({mensagem: `registro deletado`});
    }catch(erro){
        return res.status(500).json({ erro: erro.message});
    }
}
/*
    Por ultimo, é importante entender uma diferença crucial entre 'findOne' e 'findByPk' é que 'findByOne' esse método o primeiro registro que ele encontrar caso nenhum registro cumpra os requerimentos portanto, caso a propriedade 'where' de 'findByOne' esteja mal formada, ele não acusará nenhum erro e retornará o primeiro registro disponivel, por isso devemos ter cuidado em formar o 'where' de maneira correta.
*/
