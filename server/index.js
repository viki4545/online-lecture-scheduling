const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn.js");
const { notFound, errorHandler } = require("./middlewares/errorHandler.js");
const courseRouter = require("./routes/courseRoute.js");
const instructorRouter = require("./routes/instructorRoute.js");
const authRouter = require("./routes/authRoute.js");
const PORT = process.env.PORT || 5000;

const app = express();

// connection to mongoDb
connectDB();

app.use(
  cors({
    origin: process.env.CORS_DOMAIN,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/instructors", instructorRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started running on the port ${PORT}`);
});
