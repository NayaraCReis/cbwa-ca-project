const db = require('../db')();
const COLLECTION = 'projects';

module.exports = () => {

    const get = async (slugName = null) => {
        try {
        if (!slugName) {
                const slug = await db.get(COLLECTION);
                return { slug };
            } 
            const slug = await db.get(COLLECTION, {
            slug: slugName,
        });
            return { slug };
        } catch (err) {
            console.log(err);
            return {
                error: err,
            };
        }
    }

    const add = async (slugName, title, description) => {
        if(!slugName || !title || !description) {
            return {
                error: 'fill in all fields',
            };
        }
        try {
            const slugName = await db.get(COLLECTION, {
                slug: slugName,
            });

            if (slugName.length > 0) {
                return {
                    result: 'Project already exists',
                };
            }
            
            const results = await db.add(COLLECTION, {
                slugName: slugName,
                title: title,
                description: description,
            });

            return {results};
        } catch (err) {
            console.log(err);
            return {
                error: err,
            };
        }
    };
    return {
        get,
        add,

    };
};
