const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(x => {
    console.log(
      `Connected to MongoDB ! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(error => {
    console.error("Error while connecting to MongoDB !", error);
  });

//body-parser (req.body)
app.use(express.urlencoded({ extended: true })); //allow server to parse body from POST and PUT requests
app.use(express.json()); //allow server to parse JSON from AJAX requests
app.use(cors());

//using routers
app.use("/api/rentals", require("./routes/rentals"));
app.use("/api/users", require("./routes/users"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/payments", require("./routes/payments"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(process.env.PORT, () => {
  console.log(`App listening on: http://localhost:${process.env.PORT}/ !`);
});
