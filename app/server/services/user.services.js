const db = require("./db"),
  User = require("./models/User")(db),
  { writeImage, deleteImage } = require("./scripts");

class UserService {
  getUsers(condition) {
    return new Promise((res, rej) => {
      if (condition) {
        return res(
          User.findOne({
            where: condition,
          })
        );
      }
      return res(User.findAll());
    });
  }

  createUser(data, file) {
    return new Promise(async (res, rej) => {
      const user = await User.create(data);
      if (user && file.data) {
        await writeImage(file.data, file.path, file.filename, file.extArr);
      }
      res({ user_id: user.user_id });
    });
  }
  updateUser(data, id, file) {
    return new Promise(async (res, rej) => {
      const updated = await User.update(data, {
        where: {
          user_id: id,
        },
      });

      if (file.data) {
        await deleteImage(file.path, file.oldfilename);
        await writeImage(file.data, file.path, file.filename, file.extArr);
      }
      res({ updated: updated[0] });
    });
  }
  deleteUser() {
    return new Promise(async (res, rej) => {
      const deleted = await User.destroy({
        where: {
          user_id: id,
        },
      });
      return res({ deleted: deleted });
    });
  }
}

module.exports = new UserService();
