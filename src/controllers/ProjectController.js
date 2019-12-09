const Project = require('../models/Project');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        const projects = await Project.find()
            .sort('-createdAt')
            .skip((page - 1) * pagination)
            .limit(pagination);

        return res.json(projects);
    },

    async store(req, res) {
        console.log('FILE', req.file);
        console.log('BODY', req.body);
        const { author, description, technologies } = req.body;
        const { filename: image } = req.file;
        const date = Date.now();

        const [name] = image.split('.');
        const fileName = `${date}-${name}.jpg`;

        await sharp(req.file.path)
            .resize(800)
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )

        fs.unlinkSync(req.file.path);

        const project = await Project.create({
            author,
            description,
            technologies,
            image: fileName,
        });

        return res.json(project);
    }
}