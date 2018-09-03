
require('dotenv').config();


const path = require("path");

const BASE_PATH = path.join(__dirname, "db");
const DATABASE = process.env.NETWORK_SCANNER_DB_NAME;
console.log(NETWORK_SCANNER_DB_NAME)
console.log(DATABASE)

console.log("In migrations file");
console.log(BASE_PATH);

module.exports = {
  test: {
    client: "pg",
    connection: `
postgres: //${process.env.LOCAL_DB_USERNAME}:${
    process.env.LOCAL_DB_PASSWORD
}
@localhost: 5432 / $ {
    DATABASE
}
_test `,
    migrations: {
      directory: path.join(BASE_PATH, "migrations", "V0.5.0")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds/test")
    }
  },
  development: {
    client: "pg",
    connection: `
postgres: //${process.env.LOCAL_DB_USERNAME}:${
    process.env.LOCAL_DB_PASSWORD
}
@localhost: 5432 / $ {
    DATABASE
}
`,
    migrations: {
      directory: path.join(BASE_PATH, "migrations", "V0.5.0")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds/dev")
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(BASE_PATH, "migrations", "V0.5.0")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds/dev")
    }
  }
};