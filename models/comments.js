const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
    const catchWholeCommentsOfIssue = async (issueNumber) => {
     const PIPELINE =  [ 
        {$match: {"slugName": issueNumber}},
        {$project: {
            comments: 1,
            _id: 0,
            issueNumber: 1
        }}     
    ]

    const getComment = await db.aggregate(COLLECTION, PIPELINE);
    return getComment;
    };

    const getUniqueComment = async (CommentId) => {
        const PIPELINE = [ 
            {$match: {'comments._id': ObjectID(CommentId)}},
            {$project: {
                comments: {$filter: {
                    input: '$comments',
                    as: 'comment',
                    cond: {$eq:['$$comment._id', ObjectID(CommentId)]} 

        }},
        _id: 0,
        issueNumber: 1
    }}
    ]

    const comments = await db.aggregate(COLLECTION, PIPELINE);

    return comments;
    }


    const addComment = async(issueNumber, text, author) => {
        const PIPELINE = [{slugName: issueNumber}, {$push:{comments: {
            _id: new ObjectID(),
            text: text,
            author: author
        }}}]

        const results = await db.update(COLLECTION, PIPELINE);

        return results.result;
    };

    return {
      catchWholeCommentsOfIssue,
      getUniqueComment,
      addComment

    };
};