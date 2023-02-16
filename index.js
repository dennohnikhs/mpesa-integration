const express = require("express")
const dotenv = require("dotenv")
const app = express()
const mongoose= require("mongoose")
const mpesaRoutes = require("./routes/mpesa")
dotenv.config()
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log('connected successfully to the database');
  })
  .catch((err) => {
    console.log(err.message);
  })
const port =process.env.PORT 
app.use(express.json())
app.use("/api",mpesaRoutes)
app.listen(port,()=>{
    console.log(`app running at port ${port}`)
})