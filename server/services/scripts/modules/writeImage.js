const fs = require("fs"),
  path = require("path");

module.exports = (file, imagePath, filename, extArr) => {
  if (extArr.includes(path.extname(file.originalname))) {
    return new Promise((res, rej) => {
      fs.writeFile(path.resolve(imagePath, filename), file.buffer, (error) => {
        return res({ error: error });
      });
      return res({ filename: filename });
    });
  } else {
    return { error: "File extension not allowed" };
  }
};
