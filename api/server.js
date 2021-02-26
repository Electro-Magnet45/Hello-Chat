import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Messages from "./dbTweets.js";
import Users from "./dbUser.js";
import cors from "cors";
/* import { createServer } from "http";
import { Server } from "socket.io"; */
import Pusher from "pusher";

const app = express();
/* const app2 = express(); */
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pusher = new Pusher({
  appId: "1155160",
  key: "f2ccd03741a0cd0d0545",
  secret: "8282efa822a6efe71ce2",
  cluster: "ap2",
  useTLS: true,
});

/* const wss = new WebSocket.Server({ port: 8080 });
var wsocket = null;

wss.on("connection", function connection(ws) {
  wsocket = ws;
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
}); */

const connection_url =
  "mongodb+srv://admin:admin@cluster0.hec08.mongodb.net/posts?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

/* Messages.watch().on("change", (change) => {
  if (change.operationType === "insert") {
    const messageDetails = change.fullDocument;
    wsocket.send(
      JSON.stringify({
        displayName: messageDetails.displayName,
        userName: messageDetails.userName,
        verified: messageDetails.verified,
        text: messageDetails.text,
        avatar: messageDetails.avatar,
        image: messageDetails.image,
      })
    );
  }
}); */

Messages.watch().on("change", (change) => {
  if (change.operationType === "insert") {
    const messageDetails = change.fullDocument;

    pusher.trigger("messages", "inserted", {
      message: JSON.stringify({
        displayName: messageDetails.displayName,
        userName: messageDetails.userName,
        verified: messageDetails.verified,
        text: messageDetails.text,
        avatar: messageDetails.avatar,
        image: messageDetails.image,
      }),
    });
  }
});

// API calls

app.get("/api/sync", (req, res) => {
  Messages.find({})
    .sort({ time: "descending" })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
});

app.post("/api/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/api/findUser", (req, res) => {
  const queryId = req.body;

  Users.findOne({ userId: queryId.userId }, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(doc);
    }
  });
});

app.post("/api/insertUser", (req, res) => {
  const userData = req.body;

  Users.create(userData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/deleteMessages", (req, res) => {
  Messages.deleteMany((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/deleteUsers", (req, res) => {
  Users.deleteMany((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

/* const httpServer1 = createServer(app); */

app.listen(port, () => console.log(`Listening on port ${port}`));

//socket.io
/* var socketio = null;

const httpServer = createServer(app2);
const io = new Server(httpServer, {
  cors: {
    origin: "*:*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socketio = socket;
  console.log("connected");
});

Messages.watch().on("change", (change) => {
  if (change.operationType === "insert") {
    const messageDetails = change.fullDocument;
    socketio.emit(
      "newMessage",
      JSON.stringify({
        displayName: messageDetails.displayName,
        userName: messageDetails.userName,
        verified: messageDetails.verified,
        text: messageDetails.text,
        avatar: messageDetails.avatar,
        image: messageDetails.image,
      })
    );
  }
});

httpServer.listen(8080); */
