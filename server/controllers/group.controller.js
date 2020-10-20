const GroupService = require("../services/group.services"),
  bcrypt = require("bcryptjs"),
  imageConfig = require("config").get("images");

class GroupController {
  async getGroups(req, res) {
    if (req.params.id) {
      res
        .status(200)
        .json(await GroupService.getGroups({ group_id: req.params.id }));
    } else {
      res.status(200).json(await GroupService.getGroups());
    }
  }

  async createGroup(req, res) {
    const groupExist = await GroupService.getGroups({ title: req.body.title });
    if (groupExist)
      return res
        .status(400)
        .json({ error: "Group with this title already exists" });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }

    req.body.owner_id = req.user.user_id;

    if (req.file) {
      req.body.logo_filename = `${Date.now()}${path.extname(
        req.file.originalname
      )}`;
    }

    res.status(200).json(
      await GroupService.createGroup(req.body, {
        data: req.file,
        path: imageConfig.path,
        filename: req.body.logo_filename,
        extArr: imageConfig.ext,
      })
    );
  }

  async updateGroup(req, res) {
    const groupExist = await GroupService.getGroups({ title: req.body.title });
    if (groupExist)
      return res
        .status(400)
        .json({ error: "Group with this title already exists" });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }

    const oldfilename = req.body.logo_filename;

    if (req.file) {
      req.body.logo_filename = `${Date.now()}${path.extname(
        req.file.originalname
      )}`;
    }

    res.status(200).json(
      await GroupService.updateGroup(req.body, req.params.id, {
        data: req.file,
        path: imageConfig.path,
        filename: req.body.logo_filename,
        extArr: imageConfig.ext,
        oldfilename,
      })
    );
  }

  async deleteGroup(req, res) {
    res.status(200).json(await GroupService.deleteGroup(req.params.id));
  }
}

module.exports = new GroupController();
