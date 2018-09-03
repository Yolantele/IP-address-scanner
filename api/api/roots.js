
// //2.  db sql db service insert row:
// exports.insert = function (tableName, object, callback) {
//   knex(tableName)
//     .insert(object, "id")
//     .then(function (results) {
//       var row = results[0];

//       if (results && results.length == 1) {
//         object.id = results[0];
//         return callback(null, object);
//       }

//       return callback(null, results);
//     })
//     .catch(function (err) {
//       return callback(err);
//     });
// };


// //1. service which calls DB service:
// const asyncDbServices = require("./db/async-sql");
// const emailServices = require("./email-services");
// const instanceDomainServices = require("./instance-domain-services");

// const USER_INSTANCES_TABLE = "user_instances";

// const moment = require("moment");
// const INSTANCE_DOMAINS_TABLE = "instance_domains";
// const INSTANCE_TABLE = "instances";
// const DEFAULT_HOLIDAY_ALLOWANCE = 30;
// const HOLIDAY_YEAR_START_DATE = moment("2017-01-01");

// const uuidv4 = require("uuid/v4");

// const createNewInstance = async (email, password, title, type) => {
//   try {
//     const domain = instanceDomainServices.extractDomainFromEmail(email);
//     const existingDomain = await findInstancesForDomain(domain);

//     if (!existingDomain.length > 0) {
//       const instanceObj = {
//         title,
//         default_holiday_allowance: DEFAULT_HOLIDAY_ALLOWANCE,
//         holiday_year_start_date: HOLIDAY_YEAR_START_DATE,
//         type
//       };

//       const newInstance = await asyncDbServices.add(
//         INSTANCE_TABLE,
//         instanceObj
//       );

//       if (newInstance.length) {
//         const domainObj = {
//           domain,
//           instance_id: newInstance[0].id
//         };

//         const newDomain = await asyncDbServices.add(
//           INSTANCE_DOMAINS_TABLE,
//           domainObj
//         );
//         if (newDomain.length) {
//           return {
//             err: null,
//             data: Object.assign(newDomain[0], newInstance[0])
//           };
//         } else {
//           throw { message: "Could not create Domain" };
//         }
//       } else {
//         throw { message: "Could not create Instance" };
//       }
//     } else {
//       throw { message: "That domain is already taken" };
//     }
//   } catch (err) {
//     return { err, data: null };
//   }
// };


module.exports = {
  maps: {
    post: async (req, params, env, callback) => {
      const {err, data } = await mapServices.createNewNetworkRow(
        params.ssid,
        params.devices,
        params.building,
      );
      callback(err, data);
    }
  }
};

// module.exports = {
//   create: {
//     post: async (req, params, env, callback) => {
//       const {
//         err,
//         data
//       } = await instanceServices.createNewInstance(
//         params.email,
//         params.password,
//         params.title,
//         params.type
//       );
//       callback(err, data);
//     }
//   }
// };