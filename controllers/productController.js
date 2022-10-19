const Product = require('../models/productModel')
const { getReqData } = require('../utils')

// @desc    Gets All Products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.error(error)
    }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
const getProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.error(error)
    }
}

// @desc    Create a Product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const body = await getReqData(req)

        const {name, description, price} = JSON.parse(body)

        const product = {
            name,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))  

    } catch (error) {
        console.error(error)
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
const updateProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            const body = await getReqData(req)

            const { name, description, price } = JSON.parse(body)

            const productData = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct)) 
        }

    } catch (error) {
        console.error(error)
    }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
const deleteProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}