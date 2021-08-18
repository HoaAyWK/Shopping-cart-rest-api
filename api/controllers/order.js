const Order = require('../models/order');
const Product = require('../models/product');

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('product', 'name');
        const response = {
            count: orders.length,
            orders: orders.map(order => {
                return {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/orders/' + order._id
                    }
                }
            })
        }
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports.getAOrder = async (req, res) => {
    const id = req.params.orderId;
    try {
        const order = await Order.findById(id).populate('product', 'name');
        if(!order) return res.status(404).json({message: 'Order not found'});
        res.status(200).json({
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            request: {
                type: 'GET',
                url: 'http://localhost:3001/orders'
            }
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports.createNewOrder = async (req, res) => {
    try {
        const product = await Product.findById(req.body.product);
        console.log(product);
        if (!product) return res.status(404).json({message: 'Product not found'});
        const order = new Order({
            product: req.body.product,
            quantity: req.body.quantity
        });
        const saveOrder = await order.save();
        res.status(201).json({
            message: 'Create order successful',
            request: {
                type: 'GET',
                url: 'http://localhost:3001/orders/' + order._id
            }
        });
    } catch(err) {
        res.status(500).json({
            error: err.message
        });
    }
};

module.exports.deleteOrder = async (req, res) => {
    const id = req.params.orderId;
    try {
        const order = await Order.deleteOne({_id: id});
        if (order.n > 0) {
            res.status(200).json({
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3001/orders'
                }
            });
        } else {
            res.status(404).json({message: 'Order not found'});
        }
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};