const fs = require("fs");
const { request } = require("http");

const home = (req , res)=>{
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({message: "Welcome Home Page"}));
}

const getUser = (req , res)=>{
    fs.readFile("database/users.json" , "utf-8" , (err , data)=>{

        if(err){
            return console.log(err)
        }

        const users = JSON.parse(data);

        if(req.url === "/users"){

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users));

        }
        else if(req.url.startsWith("/users/")){

            const id = Number(req.url.split("/")[2])
            const user = users.find((user) => user.id === id)

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(user));
        }
    })
}

const addUser = (req , res)=>{
    let body = ""

    req.on("data" , (chunk)=>{
        body += chunk
    })

    req.on("end" , ()=>{
        const userData = JSON.parse(body)

        fs.readFile("database/users.json" , "utf-8" , (err , data)=>{

        if(err){
            return console.log(err)
        }

        const users = JSON.parse(data);

        let userId
        if(users.length === 0){
            userId = 1
        }else {
            userId = users[users.length - 1].id + 1;
        }

        const newUser = {id: userId , ...userData}
        users.push(newUser)

        fs.writeFile("database/users.json" , JSON.stringify(users , null , 2) , (err)=>{

        if(err){
            return console.log(err)
        }

        res.statusCode = 201
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({message:"user added successfully"}));
    })
    })
    })
    
}

const getProduct = (req , res)=>{
    fs.readFile("database/products.json" , "utf-8" , (err , data)=>{

        if(err){
            return console.log(err)
        }

        const products = JSON.parse(data);

        if(req.url === "/products"){

        res.statusCode = 200
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(products));

        }
        else if(req.url.startsWith("/products/")){

            const id = Number(req.url.split("/")[2])
            const product = products.find((product) => product.id === id)

            res.statusCode = 200
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(product));
        }
    })
}

const addProduct = (req , res)=>{
    let body = ""

    req.on("data" , (chunk)=>{
        body += chunk
    })

    req.on("end" , ()=>{
        const productData = JSON.parse(body)

        fs.readFile("database/products.json" , "utf-8" , (err , data)=>{

        if(err){
            return console.log(err)
        }

        const products = JSON.parse(data);

        let productId
        if(products.length === 0){
            productId = 1
        }else {
            productId = products[products.length - 1].id + 1;
        }

        const newProduct = {id: productId , ...productData}
        products.push(newProduct)

    fs.writeFile("database/products.json" , JSON.stringify(products , null , 2) , (err)=>{

        if(err){
            return console.log(err)
        }

        res.statusCode = 201
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({message:"product added successfully"}));
    })
    })
    })
}

module.exports = {
    home,
    getUser,
    addUser,
    getProduct,
    addProduct
}