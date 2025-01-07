const dataSource = require('../database/models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async getAllRegisters() {
        return dataSource[this.model].findAll();
    }

    async getRegisterById(id) {
        return dataSource[this.model].findByPk(id);
    }

    async createRegister(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async updateRegister(dadosAtualizados, id) {
        const listaDeregistrosAtualizados =  dataSource[this.model].update
        (dadosAtualizados, {
          where: { id: id }
        });
        if (listaDeregistrosAtualizados[0] === 0){
            return false;
        } else {
            return true;
        }
    }

    async deleteRegister(id) {
        return dataSource[this.model].destroy({ where: { id: id} });
    }
}

module.exports = Services;