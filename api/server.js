import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Users from "./dbUser.js";
import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const connection_url =
  "mongodb+srv://admin:admin@cluster0.hec08.mongodb.net/posts?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// API calls

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

app.listen(port, () => console.log(`Listening on port ${port}`));
