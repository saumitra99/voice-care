// import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
// const socketIO = require("socket.io");
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
    // const pipeline = [
    //   {
    //     $project: {
    //       myField: 1,
    //     },
    //   },
    // ];

    // const changeStream = db.collection("messages").watch(pipeline);

    // changeStream.on("change", (change) => {
    //   console.log(change);
    // });
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
// const server = http.createServer(app);
// // This creates our socket using the instance of the server
// const io = socketIO(server);
// io.on("connection", (socket) => {
//   //  console.log("New client connected" + socket.id);
//   //console.log(socket);
//   // Returning the initial data of food menu from FoodItems collection
//   //   socket.on("initial_data", () => {
//   //     Messages.find().then((docs) => {
//   //       io.sockets.emit("get_data", docs);
//   //     });
//   //   });
//   FetchOnInterval = setInterval(() => {
//     Messages.find().then((docs) => {
//       sockets.emit("get_data", docs);
//     });
//   }, 500);
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     clearInterval(FetchOnInterval);
//     FetchOnInterval = null;
//   });
// });

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// routes
// api / mark - seen;
const allMessagesRoutes = require("./routes/allMessages");
// const markAsSeen = require("./routes/allMessages");
app.use("/api", allMessagesRoutes);

// port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () => console.log(`server running on ${port}`));

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
    //   Messages.find().then((docs) => {
    //     io.sockets.emit("get_data", docs);
    //   });
  });
});
