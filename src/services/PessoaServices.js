const Services = require('./Services.js');

class PessoaServices extends Services {
    constructor() {
       super('Pessoa');
       this.matriculaServices = new Services('Matricula'); 
    }

    async pegaMatriculasAtivasPorAluno(id){
        const estudante = await super.getRegisterById(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }

    async pegaTodasMatriculasPorAluno(id){
        const estudante = await super.getRegisterById(id);
        const listaMatriculas = await estudante.getTodasAsMatriculas();
        return listaMatriculas;
    }

    async pegaPessoasEscopoTodos(){
        const listaPessoas = await super.getRegisterByScope('todosOsRegistros');
        return listaPessoas;
    }

    async cancelaPessoaEMatriculas(estudanteId){
        await super.updateRegister({ ativo: false }, { id: estudanteId});
        await this.matriculaServices.updateRegister({ status: 'cancelado'}, { estudante_id: estudanteId});
    }
}

module.exports = PessoaServices;
