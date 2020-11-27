const projects = require('../models/projects')();

module.exports = () => {
    const getController = async (req, res) => {
        const { slug, error } = await projects.get();

        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(slug);
    };

    const getBySlug = async (req, res) => {
        const { slug, error } = await projects.get(req.params.slugName);

        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(slug);
    };

    const postController = async (req, res) => {
        let title = req.body.title;
        let slugName = req.body.slugName;
        let description = req.body.description;


        const { result, error } = await projects.add(slugName, title, description);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(result);
    };
    return {
        getBySlug,
        getController,
        postController,
    };
};