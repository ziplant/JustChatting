const db = require("./db"),
  Group = require("./models/Group")(db),
  { writeImage, deleteImage } = require("./scripts/");

class GroupService {
  getGroups(condition) {
    return new Promise((res, rej) => {
      if (condition) {
        return res(
          Group.findOne({
            where: condition,
          })
        );
      }
      return res(Group.findAll());
    });
  }

  createGroup(data, file) {
    return new Promise(async (res, rej) => {
      const group = await Group.create(data);
      if (group && file.data) {
        await writeImage(file.data, file.path, file.filename, file.extArr);
      }
      res({ group_id: group.group_id });
    });
  }

  updateGroup(data, id, file) {
    return new Promise(async (res, rej) => {
      const updated = await Group.update(data, {
        where: {
          group_id: id,
        },
      });

      if (file.data) {
        await deleteImage(file.path, file.oldfilename);
        await writeImage(file.data, file.path, file.filename, file.extArr);
      }
      res({ updated: updated[0] });
    });
  }

  deleteGroup(id) {
    return new Promise(async (res, rej) => {
      const deleted = await Group.destroy({
        where: {
          group_id: id,
        },
      });
      return res({ deleted: deleted });
    });
  }
}

module.exports = new GroupService();
