import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import adminRoute from './routes/Admin.js';
import userRoutes from './routes/User.js';
import inboxRoutes from './routes/inbox.js';
import housesRoutes from './routes/Houses.js';
import touristResortRoutes from './routes/TouristResort.js';
import bookingRoutes from './routes/Booking.js'

dotenv.config();
await connectDB()

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads",express.static("./uploads"))
if (process.env.NODE_ENV === "development"){
   app.use(morgan('dev'));
}

app.get('/', (req, res) => {
   res.send('API is running...')
})
app.use("/admin", adminRoute);
app.use("/user", userRoutes);
app.use("/inbox", inboxRoutes);
app.use("/houses",housesRoutes);
app.use("/touristResort",touristResortRoutes);
app.use("/booking", bookingRoutes);

app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500).send({
      success: false,
      message: err.message,
    });
  });
  

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))
