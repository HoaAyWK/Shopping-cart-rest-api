const Product = require('../models/product');

module.exports.createNewProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    product
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
    res.status(201).json({ message: 'post', newProduct: product});
};