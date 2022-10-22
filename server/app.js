// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Messages = require("./model/message.model");

// app
const app = express();
let FetchOnInterval;

// db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// routes
const allMessagesRoutes = require("./routes/allMessages");
app.use("/api", allMessagesRoutes);

// port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () => console.log(`server running on ${port}`));

// socket.io
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.REACT_APP_API_URL,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("initial_data", () => {
    FetchOnInterval = setInterval(() => {
      Messages.find().then((docs) => {
        socket.emit("get_data", docs);
      });
    }, 500);
  });
});
