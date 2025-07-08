const express = require("express");
const cors = require("cors");
const connectDataBase = require("./lib/db");
require("dotenv").config();
const authRoute = require("./routes/auth.route");
const bookingRoute = require("./routes/booking.route");
const employeeRouter = require("./routes/emoloyee.route");
const serviceRouter = require("./routes/service.route");
const productRoutes = require("./routes/product.route");
const paymentZalo = require("./routes/payment.route");
const blogsRoute = require("./routes/blogs.route");

const cookieParser = require("cookie-parser");
const getNgrokUrl = require("./lib/getNgrokUrl");

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://cleanning-booking.vercel.app/"],
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/employee", employeeRouter);
app.use("/api/service", serviceRouter);
app.use("/api/products", productRoutes);
app.use("/api/payment-zalo", paymentZalo);
app.use("/api/blogs", blogsRoute);

connectDataBase();

app.use((req, res) => {
  res.status(404).json({ message: `Not found ${req.originalUrl}` });
});

app.listen(port, async () => {
  await getNgrokUrl();
  console.log("server is running on port: " + port);
});
