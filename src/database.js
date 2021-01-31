let mongoos = require("mongoose");
const server = "127.0.0.1:27017";
const database = "myBD";
class database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoos
      .connect(`mongoodb://${server}/${database}`)
      .then(() => {
        console.log("database connecton succesful");
      })
      .catch((err) => {
        console.error("database connection failed");
      });
  }
}
module.exports = new database();
