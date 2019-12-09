const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    author: String,
    description: String,
    technologies: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Project', ProjectSchema);