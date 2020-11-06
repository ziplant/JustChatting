const { Router } = require("express"),
  router = Router(),
  MessageController = require("../../controllers/message.controller"),
  verify = require("./verify"),
  groupAccess = require("./verify/groupAccess"),
  { createValidation } = require("./validation/message.validation");

router.post("/:group_id", verify, groupAccess, MessageController.getMessages);
router.post("/", verify, createValidation, MessageController.createMessage);
router.delete("/", verify, MessageController.deleteMessage);

module.exports = router;
