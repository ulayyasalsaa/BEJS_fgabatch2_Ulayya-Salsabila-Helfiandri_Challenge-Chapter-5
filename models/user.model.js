const prisma = require('../config/db');

//get all users
async function getAllUsers () {
    return await prisma.user.findMany();
};

//get user by id
async function getUserById (id) {
    return await prisma.user.findUnique({ 
        where: { id } 
    });
};

//create user
async function createUser (id, name, email, password) {
    return await prisma.user.create({
        data: { 
            id, 
            name, 
            email, 
            password 
        }
    });
};

//update user
async function updateUser (id, name, email, password) {
    return await prisma.user.update({
        where: { id },
        data: { name, email, password }
    });
};

//patch user
async function patchUser (id, updates) {
    return await prisma.user.update({
        where: { id },
        data: updates
    });
};

//delete data
async function deleteUser (id) {
    await prisma.user.delete({ where: { id } });
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser
};

