const express = require('express');
const app = express();

// this is the way to declare middleware globaly
// this means that this is the first middleware that we want to use in all of our routes
app.use(middleware2)
app.use(middleware3)
// note: if we declared our erroHandler above the middleware declaration 
//then it will throw error because the oder matters
app.use(errorHandler)

// our global middleware
function middleware2(req, res, next){
    console.log("I am middleware2")
    /*
    let errorObj = new Error("This is an error")
    next(errorObj);
    */
   req.customProperty = 100;
   next()
}

function middleware3(req, res, next){
    console.log("I am middleware #3");
    console.log("The custom property is ", req.customProperty)
    next();
}


// Error handler middleware
// This is different because this middleware takes an extra middleware called err (for error)
// since it is a middleware we can define as much error handler middlewares we want
function errorHandler(err, req, res, next){
    // handle error
    if(err){
        // res.send("<h1> There was an error, please try again</h1>")
        res.json({err: err})
    }
}

// to use as route specific middleware
function middleware1(req, res, next){
    console.log("I am a middleware1")
    next()
}




// function errorHandler2(err, req, res, next){
//     // handle error
// }

// just like we defined this function we can also define other functions called middlewares
function standardExpressCallback(reqObject, resObject, nextMiddleware){
    console.log("I am standard express function")
    resObject.send("<h1>This is home page</h1>")
    nextMiddleware()
}

// we can call as many middlewares we want in express!
// this is an example of route specific middleware
app.get('/', middleware1 ,standardExpressCallback)

app.listen(3000, ()=>{
    console.log("app listening at http://localhost:3000/")
})