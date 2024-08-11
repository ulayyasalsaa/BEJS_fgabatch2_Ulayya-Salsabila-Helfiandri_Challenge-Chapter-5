const ACCOUNT_MODELS = require('../models/account.model');

//get all account
async function getAllAccounts (req, res) {
    try {
        const accounts = await ACCOUNT_MODELS.getAllAccounts();
        res.json({
            status: 'success',
            message: 'Accounts retrieved successfully',
            data: accounts
        });
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to retrieve accounts'
        });
    }
};

//get account by id
async function getAccountById (req, res) {
    try {
        const account = await ACCOUNT_MODELS.getAccountById(parseInt(req.params.id));
        if (account) {
            res.json({
                status: 'success',
                message: 'Account retrieved successfully',
                data: account
            });
        } else {
            res.json({
                status: 'error',
                message: 'Account not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to retrieve account'
        });
    }
};

//create account
async function createAccount (req, res) {
    try {
        const { id, bankName, accountNumber, balance, userID } = req.body;
        if (!id || !bankName || !accountNumber || !balance || !userID) {
            res.json({
                status: 'error',
                message: 'Invalid input'
            });
        } else {
            const newAccount = await ACCOUNT_MODELS.createAccount(id, bankName, accountNumber, balance, userID);
            res.json({
                status: 'success',
                message: 'Account created successfully',
                data: newAccount
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to create account'
        });
    }
};

//update account
async function updateAccount (req, res) {
    try {
        const { bankName, accountNumber, balance } = req.body;
        if (!bankName || !accountNumber || !balance) {
            res.json({
                status: 'error',
                message: 'Invalid input'
            });
        } else {
            const account = await ACCOUNT_MODELS.updateAccount(parseInt(req.params.id), bankName, accountNumber, balance);
            if (account) {
                res.json({
                    status: 'success',
                    message: 'Account update successfully',
                    data : account
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Account not found'
                });
            }
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to update account'
        });
    }
};

//delete account
async function deleteAccount (req, res) {
    try {
        const success = await ACCOUNT_MODELS.deleteAccount(parseInt(req.params.id));
        if (success) {
            res.json({
                status: 'success',
                message: 'Account deleted successfully'
            });
        } else {
            res.json({
                status: 'error',
                message: 'Account not found'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Failed to delete Account'
        });
    }
};

module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}