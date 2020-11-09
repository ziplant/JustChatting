const User = require("../services/models/User");

const UserService = require("../services/user.services"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  tokenSecret = require("config").get("tokenSecret"),
  imageConfig = require("config").get("images"),
  path = require("path");

class UserController {
  async authUser(req, res) {
    const user = await UserService.getUsers({ username: req.body.username });

    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (validPass) {
        const token = jwt.sign({ user_id: user.user_id }, tokenSecret);
        return res
          .status(200)
          .header("auth-token", token)
          .json({ user_id: user.user_id, token: token });
      }
    }

    return res.status(400).json({ error: "Login or password is wrong" });
  }

  async getUsers(req, res) {
    if (req.params.id) {
      res
        .status(200)
        .json(await UserService.getUsers({ user_id: req.params.id }));
    } else {
      res.status(200).json(await UserService.getUsers());
    }
  }

  async createUser(req, res) {
    const usernameExist = await UserService.getUsers({
      username: req.body.username,
    });

    if (usernameExist)
      return res.status(400).json({ error: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    if (req.file) {
      req.body.portrait_filename = `${Date.now()}${path.extname(
        req.file.originalname
      )}`;
    }

    res.status(200).json(
      await UserService.createUser(req.body, {
        data: req.file,
        path: `${imageConfig.path}/users`,
        filename: req.body.portrait_filename,
        extArr: imageConfig.ext,
      })
    );
  }

  async updateUser(req, res) {
    const usernameExist = await UserService.getUsers({
      username: req.body.username,
    });

    if (usernameExist)
      return res.status(400).json({ error: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;
    const oldfilename = req.body.portrait_filename;
    if (req.file) {
      req.body.portrait_filename = `${Date.now()}${path.extname(
        req.file.originalname
      )}`;
    }

    res.status(200).json(
      await UserService.updateUser(req.body, req.params.id, {
        data: req.file,
        path: `${imageConfig.path}/users`,
        filename: req.body.portrait_filename,
        extArr: imageConfig.ext,
        oldfilename,
      })
    );
  }

  async deleteUser(req, res) {
    res.status(200).json(await UserService.deleteUser(req.params.id));
  }
}

module.exports = new UserController();
