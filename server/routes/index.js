const { Router } = require("express"),
  router = Router();

router.use("/group", require("./modules/group.routes"));
router.use("/message", require("./modules/message.routes"));
router.use("/user", require("./modules/user.routes"));

module.exports = router;
