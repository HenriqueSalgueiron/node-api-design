//This folder is about the environment/stage configs.

import merge from "lodash.merge";

// setting a default value to make sure NODE_ENV is set
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// stage != environment (run prod in local, for ex.). here is set a default.
const stage = process.env.STAGE || "loca ";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else if (stage === "local") {
  envConfig = require("./local").default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
); // it's the default env configs

