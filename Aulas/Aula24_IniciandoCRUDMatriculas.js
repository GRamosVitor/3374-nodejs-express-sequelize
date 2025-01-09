/*
    Agora que nossa API possui escopos, vamos terminar o CRUD de matriculas.
    Vamos começar pelo POST, começando pela rota. Vamos lembrar que, na nossa aPI, "matricula" sempre está associada a "pessoa", portanto as rotas de '/matriculas' deverão estar dentro do arquivo 'pessoasRoutes.js'. Nesse arquivo, já temos o método GET em '/pessoas/:estudante_id/matriculas. Vamos compiar esse método e mudar para 'POST'. Agora, como o método POST deverá criar uma nova matricula, o modelo usado sera o 'Matricula' e, portanto, devemos usar o método de MatriculaController e não PessoaController, como fizemos com o método GET.
    Vamos importar MatriculaController e instaciar a classe
*/ 
const MatriculaController = require('../controllers/MatriculaController.js')

const matriculaController = new MatriculaController();
/*
    Em seguida, no método POST da rota que estamos fazendo, vamos chamar o método 'matriculaController.criaNovo(req,res)'
*/
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.createNew(req, res));
/*
    Isso já será o suficiente para que o POST funcione, graças à herança de classes.
*/