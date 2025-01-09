/*
    Agora que nós temos, na nossa classe 'pessoa.js', o escopo 'status: matriculado', as pessoas usuárias da API não têm mais acesso aos registros de metricula que não tenham o status definido como 'matriculado'. Vamos criar um método para que isso seja possível.
    Quando queremos adicionar mais condições ao escopo, podemos simplesmente adicionar mais objetos ao atributo 'scope' com as condições que desejamos. 
    Porém, para ter um escopo com condições e outro sem nenhuma condição, precisamos fazer outra associação entre a 'pessoa' e 'matriculas' sem nenhum escopo e alterar o 'alias' da associação:
*/
Pessoa.hasMany(models.Matricula, {
    foreignKey: 'estudante_id',
    as: 'todasAsMatriculadas'
  });
/*
    Agora que temos a associação feita, precisamos criar uma rota que se conectará com o controlador e o serviço correspondentes. Para não confundir com o método de pegar as matriculas ativas, vamos refatorar o nome desse método, além de criar a nova rota
*/
    router.get('/pessoas/:estudante_id/matriculas', (req, res) => pessoaController.pegaMatriculasAtivas(req, res));
    router.get('/pessoas/:estudante_id/matriculas/todos', (req, res) => pessoaController.pegaTodasMatriculas(req, res));
/*
    Agora, podemos criar o método 'pegaTodasMatriculas()' e alterar o nome 'pegaMatriculasAtivas()' no controlador de pessoas. Veja que mudamos também o nome do método de 'pessoaServices' para se adequar melhor ao retorno de matriculas ativas
*/
class PessoaController {
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
}
/*
    Por ultimo, criamos o método 'pegaTodasMatriculasPorAluno' e alteramos o nome do método 'pegaMatriculasAtivasPorAluno' em 'PessoaServices.js'
*/

class PessoaServices{
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
}