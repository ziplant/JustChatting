const { Router } = require("express"),
  router = Router(),
  GroupController = require("../../controllers/group.controller"),
  verify = require("./verify"),
  multer = require("multer"),
  upload = multer(),
  {
    createValidation,
    updateValidation,
  } = require("./validation/group.validation");

router.get("/", verify, GroupController.getGroups);
router.get("/:id", verify, GroupController.getGroups);
router.post(
  "/",
  verify,
  upload.single("logo"),
  createValidation,
  GroupController.createGroup
);
router.put(
  "/:id",
  verify,
  upload.single("logo"),
  updateValidation,
  GroupController.updateGroup
);
router.delete("/:id", verify, GroupController.deleteGroup);

module.exports = router;
