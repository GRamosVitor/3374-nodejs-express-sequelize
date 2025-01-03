
class Controller {
    constructor(entidadeService) {
       this.entidadeService = entidadeService;
    }

    async getAll(req, res) {
        try {
            const listaDeRegistros = await this.entidadeService.getAllRegisters();
            return res.status(200).json(listaDeRegistros);
        } catch(erro){
            //erro
        }
    }
}

module.exports = Controller;