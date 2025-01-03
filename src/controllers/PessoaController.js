const database = require ('../models');

class PessoaController {
    static async getAll (req, res) {
        try {
            const pessoasEncontradas = await database.Pessoa.findAll();
            return res.status(200).json(pessoasEncontradas);
        } catch (erro) {

        }
    }
}

module.exports = PessoaController