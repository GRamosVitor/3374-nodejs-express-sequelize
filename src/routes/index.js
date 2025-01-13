const express = require ('express');
const pessoas = require('./pessoasRoutes.js');
const cursos = require('./cursosRoutes.js');
const categorias = require('./categoriasRoutes.js');

module.exports = app => {
    app.use(
        express.json(),
        pessoas,
        cursos,
        categorias
    );
};