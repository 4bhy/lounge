const express= require('express')
const connectDB= require('./config/db')
const userRoutes=require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes");
const hostRoutes= require("./routes/hostRoutes")
const app= express()
const dotenv= require("dotenv")
const cors= require("cors")
const {errorHandler}= require("./middlewares/errorMiddleware")
const helmet= require("helmet")

connectDB();
app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(cors({
    origin: '*'
}))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


app.use(function (req, res, next) {
    res.set('cache-control', 'no-cache , no-store,must-revalidate,max-stale=0,post-check=0,pre-checked=0');
    next();
}); 


app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/host", hostRoutes);


app.use(errorHandler);


app.listen(5000, ()=>{
    console.log("Connected to 5000");
})



