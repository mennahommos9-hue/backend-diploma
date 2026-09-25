const {
    home,
    getUser,
    addUser,
    getProduct,
    addProduct
 } = require("./routes")

const app = (req , res)=>{

    if(req.url === "/" && req.method === "GET"){
        return home(req , res)
    }
    if(req.url === "/users" && req.method === "GET"){
        return getUser(req , res)
    }
    if((req.url.startsWith("/users/")) && req.method === "GET"){
        return getUser(req , res)
    }
    if(req.url === "/users" && req.method === "POST"){
        return addUser(req , res)
    }
    if(req.url === "/products" && req.method === "GET"){
        return getProduct(req , res)
    }
    if((req.url.startsWith("/products/")) && req.method === "GET"){
        return getProduct(req , res)
    }
    if(req.url === "/products" && req.method === "POST"){
        return addProduct(req , res)
    }
    
    res.statusCode = 404
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ message: "route not found" }))
}

module.exports = app