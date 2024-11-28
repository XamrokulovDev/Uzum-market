const Cart = require('../models/cart.model');
const asyncHandle = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// GET all carts
exports.getAllCarts = asyncHandle(async (req, res, next) => {
    const carts = await Cart.find();
    if (!carts || carts.length === 0) {
        return next(new ErrorResponse('Savat topilmadi!', 404));
    }
    res.status(200).json({
        success: true,
        count: carts.length,
        data: carts,
    });
});

// GET cart by _id
exports.getCartById = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
        return next(new ErrorResponse(`${id} ga teng bo'lgan mahsulot topilmadi!`, 404));
    }
    res.status(200).json({
        success: true,
        data: cart,
    });
});

// POST create new cart
exports.createNewCart = asyncHandle(async (req, res, next) => {
    const { name, image, title, price } = req.body;
    if (!name || !image || !title || !price) {
        return next(new ErrorResponse('Barcha maydonlarni to‘g‘ri to‘ldiring!', 400));
    }
    const newCart = await Cart.create({ name, image, title, price });
    res.status(201).json({
        success: true,
        data: newCart,
    });
});

// PUT update cart by _id
exports.updateCart = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const { name, image, title, price } = req.body;
    let cart = await Cart.findById(id);
    if (!cart) {
        return next(new ErrorResponse(`${id} ga teng bo'lgan mahsulot topilmadi!`, 404));
    }
    cart = await Cart.findByIdAndUpdate(
        id,
        { name, image, title, price },
        // { new: true, runValidators: true }
    );
    res.status(200).json({
        success: true,
        data: cart,
    });
});

// DELETE cart by _id
exports.deleteCart = asyncHandle(async (req, res, next) => {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
        return next(new ErrorResponse(`${id} ga teng bo'lgan mahsulot topilmadi!`, 404));
    }
    await cart.deleteOne();
    res.status(200).json({
        success: true,
        message: `${id} ga teng mahsulot muvaffaqiyatli o‘chirildi!`,
    });
});