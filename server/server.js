const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "..", "build");
app.use(express.static(buildPath));

app.get("/", async (req, res) => {
  res.send("Woo!");
});

io.on("connection", function (socket) {
  socket.on("client-emit", function (data) {
    console.log("client emitted!");
    io.emit("new-command", "someone said hello!");
  });
});

http.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
