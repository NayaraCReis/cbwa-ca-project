const issues = require('../models/issues')();

module.exports = () => {
    const getController = async (req, res) => {
    res.json(await issues.get());
    };
const getByIssue = async (req, res) => {
res.json(await issues.get(req.params.slug));
    };
const getByProject = async (req, res) => {
    res.json(await issues.getByProjectId(req.params.slug));
    };

const postController = async (req, res) => {

    let slugName = req.params.slugName;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let project_id = req.body.project_id;

    const result = await issues.add(slugName, title, description, status, project_id);
    res.json(result);

    }  
return {
    getByIssue,
    getController,
    postController,
    getByProject
};
};