const Product = require('../models/product');

module.exports.getAllProducts = (req, res) => {
    Product.find()
    .then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    productImage: product.productImage,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/products/' + product._id
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: error.message});
    });
};

module.exports.getAProduct = (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
    .then(product => {
        res.status(200).json({
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                productImage: product.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/products'
                }
            });
    }).catch(error => {
        res.status(404).json({error: error.message});
    });
};

module.exports.createNewProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        productImage: req.file.path
    });
    product
    .save()
    .then(result => {
        res.status(201).json({
            message: 'Create product successful',
            createdProduct: {
                _id: result._id,
                name: result.name,
                description: result.description,
                price: result.price,
                productImage: product.productImage,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/products/' + result._id
                }
            }
        });
    }).catch(err => res.status(500).json({error: err.message}));
};

module.exports.updateProduct = async (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    try {
        const result = await Product.updateOne({ _id: id }, updateOps);
        if (result.n > 0) {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/products/' + id
                }
            });
        } else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports.deleteAProduct = async (req, res) => {
    const id = req.params.productId;
    try {
        const result = await Product.deleteOne({ _id: id });
        if (result.n > 0) {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/products',
                    body: {
                        name: 'String',
                        description: 'String',
                        price: 'Number'
                    }
                }
            });
        }
        else {
            res.status(404).json({message: 'Product not found'});
        }
    } catch(err) {
        res.status(500).json({error: error.message});
    }
};