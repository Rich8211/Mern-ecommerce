const express = require('express');
const router = express.Router()
const isAdmin = require('../middleware/auth');
const upload = require('../middleware/fileUpload');
const {
    getProducts,
    createProduct,
    updateProduct,
    getProductById,
    deleteProduct,
    reviewProduct,
    getReviews
} = require('../controllers/productController')

router.route('/')
    .get(getProducts)
    .post(isAdmin, upload.single('image'), createProduct);

router.route('/:id')
    .get(getProductById)
    .put(isAdmin, upload.single('image'), updateProduct)
    .delete(isAdmin, deleteProduct)

router.route('/reviews/:id')
    .post(reviewProduct)
    .get(getReviews)    
    
module.exports = router