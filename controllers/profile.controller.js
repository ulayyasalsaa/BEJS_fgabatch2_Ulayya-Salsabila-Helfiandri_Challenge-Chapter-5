const PROFILE_MODELS = require('../models/profile.model');

//get all profile
async function getAllProfiles (req, res) {
    try {
        const profiles = await PROFILE_MODELS.getAllProfiles();
        res.json({
            status: 'success',
            message: 'Profiles retrieved successfully',
            data: profiles
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to retrieve users'
        });
    }
};

//get profile by id
async function getProfileById (req, res) {
    try {
        const profile = await PROFILE_MODELS.getProfileById(parseInt(req.params.id));
        if (profile) {
            res.json({
                status: 'success',
                message: 'Profile retrieved successfully',
                data: profile
            });
        } else {
            res.json({
                status: 'error',
                message: 'Profile not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to retrieve Profile'
        });
    }
};

//create profile
async function createProfile (req, res) {
    try {
        const { id, identityType, identityNumber, address, userID } = req.body;
        if (!id || !identityType || !identityNumber || !address || !userID) {
            res.json({
                status: 'error',
                message: 'Invalid input'
            });
        } else {
            const newProfile = await PROFILE_MODELS.createProfile(id, identityType, identityNumber, address, userID);
            res.json({
                status: 'success',
                message: 'Profile created successfully',
                data: newProfile
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to create Profile'
        });
    }
};

//update profile
async function updateProfile (req, res) {
    try {
        const { identityType, identityNumber, address } = req.body;
        if ( !identityType || !identityNumber || !address) {
            res.json({
                status: 'error',
                message: 'Invalid input'
            });
        } else {
            const profile = await PROFILE_MODELS.updateProfile(parseInt(req.params.id), identityType, identityNumber, address);
            if (profile) {
                res.json({
                    status: 'success',
                    message: 'Profile updated successfully',
                    data: profile
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Profile not found'
                });
            }
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to update Profile'
        });
    }
};

//patch profile
async function patchProfile (req, res) {
    try {
        const profile = await PROFILE_MODELS.patchProfile(parseInt(req.params.id), req.body);
        if (profile) {
            res.json({
                status: 'success',
                message: 'Profile patched successfully',
                data: profile
            });
        } else {
            res.json({
                status: 'error',
                message: 'Profile not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to patch profile'
        });
    }
};

//delete profile
async function deleteProfile (req, res) {
    try {
        const success = await PROFILE_MODELS.deleteProfile(parseInt(req.params.id));
        if (success) {
            res.json({
                status: 'success',
                message: 'Profile deleted successfully'
            });
        } else {
            res.json({
                status: 'error',
                message: 'Profile not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to delete profile'
        });
    }
};

module.exports = {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    patchProfile,
    deleteProfile
}