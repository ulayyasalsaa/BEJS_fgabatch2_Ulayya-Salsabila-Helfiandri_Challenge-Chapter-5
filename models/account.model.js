const prisma = require('../config/db');

//get all accounts
async function getAllAccounts () {
    return await prisma.account.findMany();
};

//get account by id
async function getAccountById (id) {
    return await prisma.account.findUnique({ 
        where: { id } 
    });
};

//create account
async function createAccount (id, bankName, accountNumber, balance, userID) {
    return await prisma.account.create({
        data: {
            id,
            bankName,
            accountNumber,
            balance,
            userID
        }
    });
};

//update account
async function updateAccount (id, bankName, accountNumber, balance) {
    return await prisma.account.update({
        where : { id },
        data: { bankName, accountNumber, balance}
    })
};

//delete account
async function deleteAccount (id) {
    await prisma.account.delete({ 
        where: { id } 
    });
    return true;
};

module.exports = {
    getAllAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    deleteAccount
}