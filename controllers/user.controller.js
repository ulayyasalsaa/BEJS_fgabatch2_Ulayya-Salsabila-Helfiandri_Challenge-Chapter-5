const USER_MODELS = require('../models/user.model');

//get all user
async function getAllUsers (req, res) {
    try {
        const users = await USER_MODELS.getAllUsers();
        res.json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to retrieve users'
        });
    }
};

//get user by id
async function getUserById (req, res) {
    try {
        const user = await USER_MODELS.getUserById(parseInt(req.params.id));
        if (user) {
            res.json({
                status: 'success',
                message: 'User retrieved successfully',
                data: user
            });
        } else {
            res.json({
                status: 'error',
                message: 'User not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to retrieve user'
        });
    }
};

//create user
async function createUser (req, res) {
    try {
        const { id, name, email, password } = req.body;
        if (!id || !name || !email || !password) {
            res.json({
                status: 'error',
                message: 'Invalid input'
            });
        } else {
            const newUser = await USER_MODELS.createUser(id, name, email, password);
            res.json({
                status: 'success',
                message: 'User created successfully',
                data: newUser
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to create user'
        });
    }
};

//update user
async function updateUser (req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.json({
                status: 'error',
                message: 'Invalid input'
            });
        } else {
            const user = await USER_MODELS.updateUser(parseInt(req.params.id), name, email, password);
            if (user) {
                res.json({
                    status: 'success',
                    message: 'User updated successfully',
                    data: user
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'User not found'
                });
            }
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to update user'
        });
    }
};

//patch user
async function patchUser (req, res) {
    try {
        const user = await USER_MODELS.patchUser(parseInt(req.params.id), req.body);
        if (user) {
            res.json({
                status: 'success',
                message: 'User patched successfully',
                data: user
            });
        } else {
            res.json({
                status: 'error',
                message: 'User not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to patch user'
        });
    }
};

//delete data
async function deleteUser (req, res) {
    try {
        const success = await USER_MODELS.deleteUser(parseInt(req.params.id));
        if (success) {
            res.json({
                status: 'success',
                message: 'User deleted successfully'
            });
        } else {
            res.json({
                status: 'error',
                message: 'User not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to delete user'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
}