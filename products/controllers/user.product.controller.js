const User = require('../models/user.model');

exports.findUsersProducts = async(req,res) => {
    console.log("Find all products");

    try {
        const result = await User.find({},{username: 1, products: 1, _id: 0})
        res.json({status: true, data: result})
    } catch (error) {
        res.json({status: false, data: err});
    }
}

exports.findUserProducts = async(req,res) => {
    const username = req.params.username;
    console.log("Find products of user with username ", username);

    try {
        const result = await User.findOne({username: username}, {_id: 0, username: 1, products: 1})
        res.json({status: true, data: result})
    } catch (error) {
        res.json({status: false, data: err});
    }
}

exports.insertUserProduct  = async(req,res) =>{
    const username = req.params.username;
    const products = req.body.products;

    console.log("Insert products to user ", username);

    try {
        const result = await User.updateOne(
            {username: username},
            {
                $push:{
                    products: products
                }
            }
        )
        res.json({status: true, data: result})
    } catch (err) {
        res.json({status: false, data: err});
    }
}

exports.updateUserProduct = async (req, res) => {
    const username = req.params.username;
    const product_id = req.params.id;
    const product_quantity = req.body.quantity;

    console.log("Update product quantity for user", username);
    console.log(product_id);
    console.log(product_quantity);

    try {
        const result = await User.updateOne(
            { username: username, "products._id": product_id },
            { 
                $set: {
                    "products.$.quantity": product_quantity
                }
            }
        )

        res.json({status: true, data: result})
    } catch (err) {
        res.json({status: false, data: err});
    }
}

exports.deleteUserProduct = async(req,res) => {
    const username = req.params.username;
    const product_id = req.params.id;


    console.log("Delete product for user", username);
    console.log(product_id);

    try {
        const result = await User.updateOne(
            {username: username},
            {
                $pull: {
                    products: {
                        _id: product_id
                    }
                }
            }
        )
        res.json({status: true, data: result})
    } catch (err) {
        res.json({status: false, data: err});
    }

}

exports.stats1 = async(req,res) => {
    console.log("For all users sum by product abd count")

    try {
        const result = await User.aggregate([
            {
                    $unwind: "$products"
            },
            {
                $project:{
                    _id: 1,
                    username: 1,
                    products: 1
                }
            },
            {
                $group: {
                    _id:{
                        username: "$username",
                        products: "$products.product"
                    },
                    totalAmount: {
                        $sum: {
                            $multiply: ["$products.cost", "$products.quantity"]
                        }
                    },
                    count: {$sum: 1}
                }
            },
            {
                $sort: {"_id.username": 1 , "_id.product": 1}
            }
        ])

        res.json({status: true, data: result})
    } catch (err) {
        res.json({status: false, data: err})
    }
}

exports.stats2 = async(req,res) => {
    const username = req.params.username;

    console.log("Stats2 on username", username)

    try {
        const result = await User.aggregate([
            {
                $match: {
                    username: username
                }
            },
            {
                    $unwind: "$products"
            },
            {
                $project:{
                    products: 1,
                    _id: 0
                }
            },
            {
                $group: {
                    _id:{
                        product: "$products.product"
                    },
                    totalAmount: {
                        $sum: {
                            $multiply: ["$products.cost", "$products.quantity"]
                        }
                    },
                    count: {$sum: 1}
                }
            },
            {
                $sort: { "_id.product": 1}
            }
        ])

        res.json({status: true, data: result})
    } catch (err) {
        res.json({status: false, data: err})
    }
}