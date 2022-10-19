let products = require('../data/products')
const { writeDataToFile } = require('../utils')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        resolve(products.find(product => product.id === id))
    })
}

const create = (product) => {
    return new Promise((resolve, reject) => {
        const id = ([...products].length + 1 ).toString()
        const newProduct = {id, ...product}
        products.push(newProduct)

        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

const update = (id, product) => {
    return new Promise((resolve, reject) => {
        const updProduct = {id, ...product}
        const index = products.findIndex(product => product.id == id)
        products[index] = updProduct

        writeDataToFile('./data/products.json', products)
        resolve(updProduct)
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        products = products.filter(product => product.id !== id)
        writeDataToFile('./data/products.json', products)
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}