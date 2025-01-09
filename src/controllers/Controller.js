const converteId = require('../utils/conversorDeStringHelper.js');

class Controller {
    constructor(entidadeService) {
       this.entidadeService = entidadeService;
    }

    async getAll(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.getAllRegisters();
            return res.status(200).json(listaDeRegistros);
        } catch(erro){
            return res.status(500).json({ erro: erro.message});
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const umRegistro = await this.entidadeService.getRegisterById(Number(id));
            return res.status(200).json(umRegistro);
        } catch (erro){
            return res.status(500).json({ erro: erro.message});
        }
    }

    async getOne(req, res) {
        const { ...params } = req.params;
        const where = converteId(params);
        try {
            const umRegistro = await this.entidadeService.getOneRegister(where);
            return res.status(200).json(umRegistro);
        } catch (erro){
            return res.status(500).json({ erro: erro.message});
        }
    }

    async createNew(req, res) {
        const dadosParaCriacao = req.body;
        try{
            const novoRegistroCriado = await this.entidadeService.createRegister(dadosParaCriacao);
            return res.status(200).json(novoRegistroCriado);
        } catch(erro){
            return res.status(500).json({ erro: erro.message});
        }
    }

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

    async excluir(req, res){
        const { ...params } = req.params;
        const where = converteId(params)
        try{
            await this.entidadeService.deleteRegister(where);
            return res.status(200).json({mensagem: `id ${where.i} deletado`});
        }catch(erro){
            return res.status(500).json({ erro: erro.message});
        }
    }

}

module.exports = Controller;