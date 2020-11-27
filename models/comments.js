const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
    // getting whole comments for an issue
    const catchWholeCommentsOfIssue = async (issueNumber) => {
        try {
            const PIPELINE = [
                { $match: { "issueCount": issueNumber } },
                {
                    $project: {
                        comments: 1,
                        _id: 0,
                        issueNumber: 1
                    },
                },
            ];
            const getComment = await db.aggregate(COLLECTION, PIPELINE);
            return { getComment };
            } catch (err) {
            return {
                error: err,
            };
        }
    };

    // getting unique comments by Id
    const getUniqueComment = async (CommentId) => {
        try {
        const PIPELINE = [
            { $match: { 'comments._id': ObjectID(CommentId) } },
            {
                $project: {
                    comments: {
                        $filter: {
                            input: '$comments',
                            as: 'comment',
                            cond: { $eq: ['$$comment._id', ObjectID(CommentId)] }
                        }
                    },
                    _id: 0,
                    issueNumber: 1
                }
            }
        ]
        const comment = await db.aggregate(COLLECTION, PIPELINE);
        return {comment} ;
    } catch (err) {
        return {
            error: err,
        };
    }
};
    // add unique comment
    const addComment = async (issueNumber, text, author) => {
        if(!issueNumber || !text || !author ) {
            return {
                error: 'fill in all fields',
            };
        }
        try {
        const PIPELINE = [{ slugName: issueNumber }, {
            $push: {
                comments: {
                    _id: new ObjectID(),
                    text: text,
                    author: author
                }
            }
        }]
        const results = await db.update(COLLECTION, PIPELINE);
        return {results};
    } catch (err) {
        return {
            error: err,
        };
    }
};

    return {
        catchWholeCommentsOfIssue,
        getUniqueComment,
        addComment

    };
};