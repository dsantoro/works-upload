const Project = require('../models/Project');

module.exports = {
    async store(req, res) {
        const project = await Project.findById(req.params.id);
        project.likes++;

        await project.save();

        return res.json(project);
    }
}