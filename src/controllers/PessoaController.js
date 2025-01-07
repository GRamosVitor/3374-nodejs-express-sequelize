const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller { 
   constructor() {
    super(pessoaServices);
   }

   async pegaMatriculas(req, res){
      console.log(req.params)
      const { estudante_id } = req.params;
      try{
         const listaMatricula = await pessoaServices.pegaMatriculasPorEstudante(Number(estudante_id));
         return res.status(200).json(listaMatricula)
      }catch (error){
         //erro
      }
   }
}

module.exports = PessoaController;