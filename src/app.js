const express = require("express");
const connectdb = require("./mongoose");
const app = express();
const port = 4000;

//Routes
const albumsRouter = require("./Routes/albumsRouter");
connectdb();
//Enable req.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world from workshop");
});

app.use("/", albumsRouter);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});