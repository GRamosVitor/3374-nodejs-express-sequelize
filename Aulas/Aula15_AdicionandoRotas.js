/*
    Agora que já temos todos os nossos controles e serviços, podemos finalmente criar as rotas e terminar o CRUD de todas as tabelas da nossa API.
    Antes de criarmos as rotas, perceba que existe uma diferença fundamental na forma em que acessamos 'categorias', 'cursos' e 'matriculas':
    Categorias e cursos podem ser acessadas diretamente, ou seja, podemos criar, deletar e alterar livremente essas tabelas. Porém, uma matricula DEVE estar sempre atrelada a uma pessoa (não existe matricula se não houver ninguem matriculado). Assim sendo, a rota de 'matriculas' será um pouco diferente das demais.
    Vamos começar pelas rotas 'cursosRoutes.js' e 'categoriasRoutes.js'. Para essas rotas, basta copiar o arquivo 'pessoasRoutes.js' e alterar o nome, e todas as referencias no codigo, de 'pessoas' para 'cursos' ou 'categorias'. Vamos ver como exemplo o arquivo 'cursosRoutes.js'
*/
const CursoController = require('../controllers/CursoController.js');

const cursoController = new CursoController();

const router = Router();

router.get('/cursos', (req, res) => cursoController.getAll(req, res));
router.get('/cursos/:id', (req, res) => cursoController.getById(req, res));
router.post('/cursos', (req, res) => cursoController.createNew(req, res));
router.put('/cursos/:id', (req, res) => cursoController.atualiza(req, res));
router.delete('/cursos/:id', (req, res) => cursoController.excluir(req, res));

module.exports = router;

/*
    Agora, vamos fazer a rota de matriculas. Abra o arquivo 'pessoasRoutes.js'. Começamos importando o modelo de matricula, pois ela tem seu proprio modelo, consequentemente tem seu proprio controlador e service, e instanciamos em seguida.
    Agora, depois de todas as rotas '/pessoas', vamos criar por enquanto um método 'post' para criar uma nova matricula. Copie o método 'post' de '/pessoas' e altere o endereço para: 
    '/pessoas/:estudante_id/matriculas' 
    Devemos fazer isso pois sempre acessamos as matriculas a partir de um estudante.
    Por ultimo, no método anonimo, altere 'pessoaController' por 'matriculaController'

    Feito isso, a herança de classes se encarrega de fazer com que todos os métodos já estejam disponiveis
*/