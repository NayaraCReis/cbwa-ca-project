const comments = require('../models/comments')();

module.exports = () => {

    const catchWhole = async (req, res) => {
        const { getComment, error } = await comments.catchWholeCommentsOfIssue(req.params.issueNumber);
        if (error) {

            res.status(500), json({
                error,
            });
        }
        res.json(getComment);
    };

    const getComment = async (req, res) => {
        const { comment, error } = await comments.getUniqueComment(req.params.commentId);
        if (error) {
            res.status(500), json({
                error,
            });
        }
        res.json(comment);
    };


    const postComment = async (req, res) => {
        let issueNumber = req.params.issueNumber;
        let text = req.body.text;
        let author = req.body.author;

    
        const { results, error } = await comments.addComment(issueNumber, text, author);
        if (error) {
            res.status(500), json({
                error,
            });
        }
        res.json(results);
    };
    return {
        catchWhole,
        getComment,
        postComment,
    };
};