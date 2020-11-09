const fs = require("fs"),
  path = require("path");

module.exports = (filepath, filename) => {
  return new Promise((res, rej) => {
    fs.unlink(path.resolve(filepath, filename), (error) => {
      return res({ error: error });
    });
    return res({});
  });
};
