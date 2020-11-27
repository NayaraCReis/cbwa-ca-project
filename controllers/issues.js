const issue = require('../models/issues')();

module.exports = () => {
    const getController = async (req, res) => {
        const { issues, error } = await issue.get();
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(issues);
    };
    const getByIssue = async (req, res) => {
        const { issues, error } = await issue.get(req.params.issueCount);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(issues);
    };
    const getByProject = async (req, res) => {
        const { issueByProject, error } = await issue.getByProjectId(req.params.slug);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(issueByProject);
    };


    const postController = async (req, res) => {

        let slugName = req.params.slugName;
        let title = req.body.title;
        let description = req.body.description;
        let status = req.body.status;
        let project_id = req.body.project_id;

        let {results, error } = await issue.add(slugName, title, description, status, project_id);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(results);
    };
    const updateStatus = async (req, res) => {
        let {issueCount, status } = req.params;

        const {results, error } = await issue.status(issueCount, status);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(results);
    };

    return {
        getByIssue,
        getController,
        postController,
        getByProject,
        updateStatus
    };
};