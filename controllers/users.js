const users = require('../models/users')();

module.exports = () => {
    const getController = async (req, res) => {
        const { user, error } = await users.get();
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(user);
    };
    const getByEmail = async (req, res) => {
        const { user, error } = await users.get(req.params.email);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(user);
    };

    const postController = async (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let usertype = req.body.usertype;
        let key = req.body.key;

        const { results, error } = await users.add(name, email, usertype, key);
        if (error) {
            res.status(500).json({
                error,
            });
        }
        res.json(results);
    };
    return {
        getByEmail,
        getController,
        postController,
    };
};