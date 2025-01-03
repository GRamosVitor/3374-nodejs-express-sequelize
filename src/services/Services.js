const dataSource = require('../models');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

    async getAllRegisters() {
        return dataSource[this.model].findAll();
    }
}

module.exports = Services;