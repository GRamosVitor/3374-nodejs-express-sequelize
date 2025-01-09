const Services = require('./Services.js');

class PessoaServices extends Services {
    constructor() {
       super('Pessoa'); 
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
}

module.exports = PessoaServices;
