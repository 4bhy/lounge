const mongoose= require('mongoose')


const connectDB= async()=>{
    mongoose.set('strictQuery', false)
  try {
        mongoose.connect('mongodb://localhost:27017/hotel', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    
    });
    console.log("DB Connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports= connectDB;