const MessageService = require("../services/message.services");

class MessageController {
  async getMessages(req, res) {
    if (req.params.id) {
      let messages = await MessageService.getMessages(
        {
          group_id: req.params.id,
        },
        +req.query._limit
      );

      return res.status(200).json(messages);
    }
    return res.status(400).json({ error: "Missing group id" });
  }

  async createMessage(req, res) {
    res.status(200).json(await MessageService.createMessage(req.body));
  }

  async deleteMessage(req, res) {
    res.status(200).json(await MessageService.deleteMessage(req.params.id));
  }
}

module.exports = new MessageController();
