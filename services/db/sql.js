const knex = require("../../db/connection");
exports.knex = knex;


exports.insert = (tableName, object, callback) => {
  knex(tableName)
    .insert(object, "id")
    .then(function (results) {
      var row = results[0];

      if (results && results.length == 1) {
        object.id = results[0];
        return callback(null, object);
      }

      return callback(null, results);
    })
    .catch(err => {
      return callback(err);
    });
};