import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from 'cors';
import {protect} from "./modules/auth";

const app = express();

//Middleware
app.use(morgan("dev"));
// important to call the middleware before the routes so it works.
// 'dev': morgan takes in a argument of what level of logging you want. 'tiny', 'concise', 'dev'...
// morgan just basically console.logs and call next(), going to the next thing in stack

//Middleware
app.use(express.json());
// allows a client to send us json

//Middleware
app.use(express.urlencoded({ extended: true }));
// allows a client to add things like a query string, parameters. if
//  it's not used, everything will be treated like a string.

//Middleware
app.use(cors())
// Cross origin research sharing: It's a configuration to put in the server, that tells
//  the browser who or what can access this api. (can he even try to talk to you?)
//  the default is: everybody can access the api, but there can still have an authenti-
//  cation that blocks stuff. Everyone can, at least, try to get access.

// For synchronous errors, express catches the error just like this. Express avoids server crashing :)
app.get('/', (req, res) => {
  throw new Error('bonk 🔨')
})
// For asynchronous errors, express catches the error through the next() method.
app.get('/', (req, res, next) => {
  setTimeout(() => {
    next(new Error('bonk 🔨'))
  }, 1000);
})
// then, can be made a middleware that'll work as an error handler
app.use((err, req, res, next) => {
  res.status(500)
  if (err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'})
  } else {
    res.status(500).json({message: "ops that's on us"})
  }
})

//Hand-made middlewave
const myMiddleware = function secret(req, res, next) {
  req.secret = "doggy";
  next();
};

//Route with a middleware inside
app.get("/", myMiddleware, (req, res) => {
  console.log("hello from Express!");
  res.status(200);
  res.json({ message: "hello", secret: req.secret });
});

//Middleware that takes parameters like, morgan and urlencoded: func that returns a func.
const customLog = (country) => (req, res, next) => {
  console.log(`I'm from ${country}`)
}

//Using the just made middleware
app.use(customLog('Brazil'))

//Use router
app.use("/api", protect, router);
//all routes from router needs to have /api to work. e.g., /product doesn't work,
//  but api/product does. It's not necessary to include a mount path like this.
//"protect" will check if the user has authorization to access.

export default app;


// what's up with the @@index thing?