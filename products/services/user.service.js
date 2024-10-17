const User = require('../models/user.model')

async function findLastInsertedUser(){
    console.log("Find last inserted user");

    try {
        const result = await User.find({}).sort({_id:-1}).limit(1)
    
        return result [0]
    } catch (err) {
        console.log("Problem in finding last inserted user")
    }
}

async function findUsersProducts(username, id){
    console.log("Find the product of the user");

    try {
        const result = await User.findOne(
        {username: 'user4'}, 
        {username:1, products:1})

        return result;
    } catch (err) {
        console.log("Problem in finding the product")
    }
}

module.exports = {findLastInsertedUser, findUsersProducts}