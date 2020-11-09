module.exports = (server) => {
  const io = require("socket.io")(server);

  let clients = new Map();
  let groups = new Map();

  io.on("connection", (socket) => {
    clients.set(socket.id);

    io.emit("groupOnline", Object.fromEntries(groups.entries()));

    socket.on("switchGroup", (newGroup) => {
      groups.set(
        socket.room || 0,
        groups.get(socket.room) ? groups.get(socket.room) - 1 : 0
      );

      socket.leave(socket.room);
      socket.join(newGroup);
      clients.set(socket.id, newGroup);

      groups.set(newGroup || 0, groups.get(newGroup) + 1 || 1);
      socket.room = newGroup;

      io.emit("groupOnline", Object.fromEntries(groups.entries()));
    });

    socket.on("sendMessage", (message) => {
      socket.broadcast.to(socket.room).emit("pushMessage", message);
    });

    socket.on("disconnect", () => {
      clients.delete(socket.id);
      groups.set(
        socket.room || 0,
        groups.get(socket.room) ? groups.get(socket.room) - 1 : 0
      );

      io.emit("groupOnline", Object.fromEntries(groups.entries()));
    });
  });
};
