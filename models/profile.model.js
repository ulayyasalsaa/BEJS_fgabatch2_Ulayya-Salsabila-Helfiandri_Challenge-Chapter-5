const prisma = require('../config/db');

//get all users
async function getAllProfiles () {
    return await prisma.profile.findMany();
};

//get user by id
async function getProfileById (id) {
    return await prisma.profile.findUnique({ 
        where: { id } 
    });
};

//create user
async function createProfile (id, identityType, identityNumber, address, userID) {
    return await prisma.profile.create({
        data: {
            id, 
            identityType, 
            identityNumber, 
            address, 
            userID
        }
    });
};

//update user
async function updateProfile (id, identityType, identityNumber, address) {
    return await prisma.profile.update({
        where: { id },
        data: { identityType, identityNumber, address }
    });
};

//patch user
async function patchProfile (id, updates) {
    return await prisma.profile.update({
        where: { id },
        data: updates
    });
};

//delete data
async function deleteProfile (id) {
    await prisma.profile.delete({ 
        where: { id } 
    });
    return true;
};

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    patchProfile,
    deleteProfile
}