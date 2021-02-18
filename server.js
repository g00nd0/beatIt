require("dotenv").config();
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const app = express();

var MONGODB_URI = "mongodb+srv://atlasAdmin:Th1nk%26Gr0w00@cluster0.nkuoe.mongodb.net/test?retryWrites=true&w=majority";
// "mongodb+srv://g00nd0:Slowlywerot-(1989)!@sei26-project4.dxhyr.mongodb.net/beatit?retryWrites=true&w=majority";

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const mongoose = require("mongoose");
mongoose.connect(MONGODB_URI || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const BeatSequenceController = require("./controllers/BeatSequenceController");
app.use("/api/beatsequence", BeatSequenceController);

const InstrumentController = require("./controllers/InstrumentController");
app.use("/api/instrument", InstrumentController);

const UserController = require("./controllers/UserController");
app.use("/api/user", UserController);

const jwtController = require("./controllers/JwtController");
app.use("/api/session", jwtController);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client-react/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client-react", "build", "index.html")
    );
  });
}

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
