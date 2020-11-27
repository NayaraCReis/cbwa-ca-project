const db = require('../db')();
const ObjectId = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {

    const get = async (issueCount = null) => {
        try {
            if (!issueCount) {
                const issues = await db.get(COLLECTION);
                return { issues };
            }
            const issues = await db.get(COLLECTION, { issueCount: issueCount });
            return { issues };
        } catch (err) {
            return {
                error: err,
            };
        }
    };

    const getByProjectId = async (slug) => {
        PIPELINE = [
            {
                $lookup: {
                    from: 'issues',
                    localField: '_id',
                    foreignField: 'project_id',
                    as: 'issues',
                },
            },
            { $match: { slug: RegExp(`^${slug}$`, 'i') } },
            {
                $project: {
                    'issues.project_id': 0,
                },
            },
        ];

        try {
            const issueByProject = await db.aggregate('projects', PIPELINE);
            return { issueByProject };
        } catch (err) {
            return {
                error: err,
            };
        }
    };


    const add = async (slugName, title, description, status) => {
        if(!slugName || !title || !description || !status) {
            return {
                error: 'fill in all fields',
            };
        }
        try {
            const project = await db.get('projects', { slug: slugName });
            const { _id, slug } = project[0];
            const counter = await db.count(COLLECTION);
            const results = await db.add(COLLECTION, {
                counter: `${slug}-${counter + 1}`,
                title: title,
                description: description,
                status: status,
                project_id: new ObjectId(_id),
                comments: []
            });

            return {results};
        } catch (err) {

            return {
                error: err,
            };
        }
    };

    const status = async (issueCount, status) => {
        if(!issueCount || !status) {
            return {
                error: 'fill in all fields',
            };
        }
        
        const PIPELINE = [
            { issueCount: issueCount },
            { $set: { status: status } },
        ];
        try {
            const results = await db.update(COLLECTION, PIPELINE);
            return {results};
        } catch (err) {
            return {
                error: err,
            };
        }
    };

    return {
        get,
        add,
        getByProjectId,
        status

    };
};