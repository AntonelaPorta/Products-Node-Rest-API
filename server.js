const http = require('http')
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('./controllers/productController');

//endpoints
const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    //GET All
    if(req.url === '/api/products' && req.method === 'GET') {
        getProducts(req,res)
    }
    //GET One
    else if (req.url.match(/\/api\/products\/\w+/ ) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req,res,id)
    }
    //POST
    else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req,res)
    }
    //UPDATE
    else if(req.url.match(/\/api\/products\/\w+/ ) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        updateProduct(req,res,id)
    }
    //DELETE
    else if(req.url.match(/\/api\/products\/\w+/ ) && req.method === 'DELETE'){
        const id = req.url.split('/')[3]
        deleteProduct(req,res,id)
    }
    //ERROR routes
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Route Not Found: Please use the api/products endpoint'}))
    }
})

//Conexion al puerto
const PORT = 8080
server.listen(PORT, error => {
    if(error) throw new Error(`Error en el servidor: ${error}`)
    console.log(`Servidor escuchando el puerto: ${PORT}`)
})
