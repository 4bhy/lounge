const mongoose= require('mongoose')


const connectDB= async()=>{
    mongoose.set('strictQuery', false)
  try {
        mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports= connectDB;