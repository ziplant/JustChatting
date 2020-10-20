const { Router } = require("express"),
  router = Router(),
  UserController = require("../../controllers/user.controller"),
  verify = require("./verify"),
  multer = require("multer"),
  upload = multer(),
  {
    createValidation,
    updateValidation,
    loginValidation,
  } = require("./validation/user.validation");

router.post("/auth", loginValidation, UserController.authUser);
router.get("/", verify, UserController.getUsers);
router.get("/:id", verify, UserController.getUsers);
router.post(
  "/",
  upload.single("avatar"),
  createValidation,
  UserController.createUser
);
router.put(
  "/:id",
  verify,
  upload.single("avatar"),
  updateValidation,
  UserController.updateUser
);
router.delete("/", verify, UserController.deleteUser);

module.exports = router;
