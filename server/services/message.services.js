const sequelize = require("./db");

const db = require("./db"),
  Message = require("./models/Message")(db),
  User = require("./models/User")(db);

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });

class MessageService {
  getMessages(condition, limit) {
    return new Promise((res, rej) => {
      if (condition) {
        return res(
          Message.findAll({
            where: condition,
            order: [["message_id", "DESC"]],
            limit: limit || null,
            include: {
              model: User,
              attributes: ["username"],
            },
          })
        );
      }
      return res([]);
    });
  }

  createMessage(data) {
    return new Promise(async (res, rej) => {
      const message = await Message.create(data);
      res({ message_id: message.message_id });
    });
  }

  deleteMessage(id) {
    return new Promise(async (res, rej) => {
      const deleted = await Message.destroy({
        where: {
          group_id: id,
        },
      });
      return res({ deleted: deleted });
    });
  }
}

module.exports = new MessageService();
