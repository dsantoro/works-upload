const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const ProjectController = require('./controllers/ProjectController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get('/projects', ProjectController.index);
routes.post('/projects', upload.single('image'), ProjectController.store);

routes.post('/projects/:id/like', LikeController.store);

module.exports = routes;