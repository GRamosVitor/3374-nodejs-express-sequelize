const { Router } = require ('express');
const CategoriaController = require('../controllers/CategoriaController.js');

const categoriaController = new CategoriaController();

const router = Router();

router.get('/categorias', (req, res) => categoriaController.getAll(req, res));
router.get('/categorias/:id', (req, res) => categoriaController.getById(req, res));
router.post('/categorias', (req, res) => categoriaController.createNew(req, res));
router.put('/categorias/:id', (req, res) => categoriaController.atualiza(req, res));
router.delete('/categorias/:id', (req, res) => categoriaController.excluir(req, res));

module.exports = router;