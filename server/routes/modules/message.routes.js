const { Router } = require("express"),
  router = Router(),
  MessageController = require("../../controllers/message.controller"),
  verify = require("./verify"),
  { createValidation } = require("./validation/message.validation");

router.get("/:id", verify, MessageController.getMessages);
router.post("/", verify, createValidation, MessageController.createMessage);
router.delete("/", verify, MessageController.deleteMessage);

module.exports = router;
