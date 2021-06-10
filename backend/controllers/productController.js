const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const getProducts = asyncHandler( async (req,res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await Product.find({...keyword})
    res.json(products);
})

const createProduct = asyncHandler(async (req,res) => {

    const {
        name,
        price,
        brand,
        category,
        countInStock,
        numReviews,
        description
    } = req.body;

    const product = new Product({
        name,
        price,
        image:req.file.location,
        brand,
        category,
        countInStock,
        numReviews,
        description
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
});

const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product)
    }

    else {
        res.status(404)
        throw new Error('Product Not Found')
    }

    res.json(product);
})

const reviewProduct = asyncHandler(async (req,res) => {
    if (req.isAuthenticated()) {
        const {
            comment,
            rating
        } = req.body

        const {
            id:user,
            name
        } = req.user;

        const product = await Product.findById(req.params.id);

        product.reviews.push([name, rating, comment, user]);
        product.numReviews = product.reviews.length;
        product.rating = Math.round((product.reviews.reduce((acc, curr) => acc + curr.rating) / product.numReviews)*100)/100  
        await product.save()  
    }
    else {
        res.status(401)
        throw new Error('Please log in to post a review.')
    }
    
    
})

const getReviews = asyncHandler( async (req,res) => {
    const product = Product.getProductById(req.params.id);
    res.json(...product.reviews)

})

const updateProduct = asyncHandler(async (req,res) => {
    
    const { 
        name, 
        price, 
        description, 
        brand, 
        category,
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = req.file.location,
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    reviewProduct,
    getReviews
}