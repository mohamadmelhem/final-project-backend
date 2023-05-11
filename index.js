import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import adminRoute from './routes/Admin.js';
import userRoutes from './routes/User.js'

dotenv.config();
await connectDB()

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development"){
   app.use(morgan('dev'));
}

app.get('/', (req, res) => {
   res.send('API is running...')
})
app.use("/admin", adminRoute);
app.use("/user", userRoutes);

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500).send({
      success: false,
      message: err.message,
    });
  });
  

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))
