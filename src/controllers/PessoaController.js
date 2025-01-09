const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller { 
   constructor() {
    super(pessoaServices);
   }

   async pegaMatriculasAtivas(req, res){
      
      const { estudante_id } = req.params;

      try{
         const listaMatricula = await pessoaServices.pegaMatriculasAtivasPorAluno(Number(estudante_id));
         return res.status(200).json(listaMatricula)
      }catch (erro){
         return res.status(500).json({ erro: erro.message});
      }
   }

   async pegaTodasMatriculas(req, res){
      
      const { estudante_id } = req.params;

      try{
         const listaMatricula = await pessoaServices.pegaTodasMatriculasPorAluno(Number(estudante_id));
         return res.status(200).json(listaMatricula)
      }catch (erro){
         return res.status(500).json({ erro: erro.message});
      }
   }

   async pegaTodasPessoas(req, res){
      try{
          const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
          return res.status(200).json(listaTodasAsPessoas);
      }catch(erro){
          return res.status(500).json({ erro: erro.message });
      }
  }
}

module.exports = PessoaController;