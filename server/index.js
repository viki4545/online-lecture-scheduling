const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn.js");
const errorHandler = require("./middlewares/errorHandler.js");
const courseRouter = require("./routes/courseRoute.js");
const userRouter = require("./routes/userRoute.js");
const PORT = process.env.PORT || 5000;

const app = express();

// connection to mongoDb
connectDB();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.write("you posted:\n");
  res.end(JSON.stringify(req.body, null, 2));
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.use("api/user", userRouter);
app.use("api/course", courseRouter);

// Global error handler should be the last middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started running on the port ${PORT}`);
});
