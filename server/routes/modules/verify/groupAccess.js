const GroupService = require("../../../services/group.services"),
  bcrypt = require("bcryptjs");

module.exports = async (req, res, next) => {
  const group = await GroupService.getGroups({ group_id: req.params.group_id });

  console.log(req.body.password);
  if (group && group.password) {
    const validPass = await bcrypt.compare(
      req.body.password || "",
      group.getDataValue("password")
    );

    if (!validPass) {
      return res.status(400).json({ error: "Access denied" });
    }
  }
  next();
};
