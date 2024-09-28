const Product = require("../models/product.model");

exports.findAll = async(req,res) => {
    console.log("Find all products");

    try {
        const result = await Product.find()

        res.json({ status: true, data: result})
    } catch (err) {
        res.json({ status: false, data: err})
    }
}

exports.findOne = async(req,res) =>{
    const product_id = req.params.id;
    console.log("Find one product with id ", product_id);

    try {
        const result = await Product.findById(product_id)

        res.json({ status: true, data: result})
    } catch (err) {
        res.json({ status: false, data: err})
    }
}

exports.create = async(req,res) =>{
    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
    });

    console.log("Insert new Product with product name", req.body.product);

    try {
        const result = await newProduct.save();
        res.json({ status: true, data: result})
    } catch (err) {
        res.json({ status: false, data: err})
    }
}

exports.update = async(req,res) =>{
    const product_id = req.params.id;
    console.log("Update product with id ", product_id);

    const updateProduct = {
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
    };

    try {
        const result = await Product.findOneAndUpdate({
          _id : product_id
        },
        updateProduct
    );
        res.json({ status: true, data: result})
    } catch (err) {
        res.json({ status: false, data: err})
    }
}


exports.delete = async(req,res) =>{
    const product_id = req.params.id;
    console.log("Delete product with id ", product_id);

    try {
        const result = await Product.findOneAndDelete({
          _id : product_id
        }
    );
        res.json({ status: true, data: result})
    } catch (err) {
        res.json({ status: false, data: err})
    }
}