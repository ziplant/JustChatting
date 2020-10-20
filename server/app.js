const express = require("express"),
  app = express(),
  server = require("http").createServer(app),
  socket = require("./socket")(server),
  path = require("path"),
  config = require("config");

app.use(express.json());
app.use("/api", require("./routes"));
app.use("/images", express.static(path.resolve(config.get("images").path)));

if (process.env.NODE_ENV == "production") {
  const root = path.resolve("client", "dist");
  app.use("/", express.static(root));
  app.get("*", (req, res) => {
    res.sendFile(path.join(root, "index.html"));
  });
}

const PORT = config.get("port") || 5000;

server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
