const express = require('express');
const router = express.Router();
const userController = require('../Controllers/ProfessoresController');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.get('/:id/turmas', userController.getUserByIdTurmas);

router.put('/:id', userController.attProfessor);

router.post('/:id/turmas', userController.addTurma);

router.get('/departamento/:departamento', userController.listaDep);

router.delete('/:id', userController.ProfessorDelete);

module.exports = router;