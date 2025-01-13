const dataSource = require('../database/models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async getAllRegisters(where = {}) {
        return dataSource[this.model].findAll({where: {...where}});
    }

    async getRegisterByScope(escopo){
        return dataSource[this.model].scope(escopo).findAll();
    }

    async getRegisterById(id) {
        return dataSource[this.model].findByPk(id);
    }

    async getOneRegister(where) {
        return dataSource[this.model].findOne({where: {...where}});
    }

    async pegaEContaRegistros(where) {
        return dataSource[this.model].findAndCountAll({
            where: {...where},
            limit: 2,
            order:[['id', 'DESC']]
        });
    }

    async createRegister(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }

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

    async deleteRegister(where) {
        return dataSource[this.model].destroy({ where: {...where} });
    }
}

module.exports = Services;