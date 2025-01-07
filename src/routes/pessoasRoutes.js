const { Router } = require ('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');

const pessoaController = new PessoaController();
const matriculaController = new MatriculaController();

const router = Router();

router.get('/pessoas', (req, res) => pessoaController.getAll(req, res));
router.get('/pessoas/:id', (req, res) => pessoaController.getById(req, res));
router.post('/pessoas', (req, res) => pessoaController.createNew(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.excluir(req, res));
router.post('/pessoas/:estudante_id/matriculas', (req, res) => matriculaController.createNew(req, res));

module.exports = router;