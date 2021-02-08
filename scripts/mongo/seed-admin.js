const bcrypt = require("bcrypt");
const chalk = require("chalk");
const MongoLib = require("../../lib/mongo");
const { config } = require("../../config");

function buildAdminUser(password) {
  return {
    password,
    username: config.authUser,
    email: config.authEmail,
  };
}

async function hasAdminUser(db) {
  const adminUser = await db.getAll("users", {
    username: config.authUser,
  });

  return adminUser && adminUser.length;
}

async function createAdminUser(db) {
  const hashedPassword = await bcrypt.hash(config.authPass, 10);
  const userId = await db.createOne("users", buildAdminUser(hashedPassword));
  return userId;
}

async function seedAdmin() {
  try {
    const db = new MongoLib();

    if (await hasAdminUser(db)) {
      console.log(chalk.yellow("Admin user already exists"));
      return process.exit(1);
    }

    const adminUserId = await createAdminUser(db);
    console.log(chalk.green("Admin user created with id:", adminUserId));
    return process.exit(0);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(1);
  }
}

seedAdmin();
