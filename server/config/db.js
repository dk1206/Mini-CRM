const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

let sequelize;
let connectionInfo;

// Determine database type (default: sqlite)
const dbType = process.env.DB_TYPE || 'sqlite';

if (dbType === 'sqlite') {
  // SQLite configuration
  const storage = process.env.SQLITE_STORAGE || path.join(__dirname, '..', 'data', 'mini-crm.sqlite');
  fs.mkdirSync(path.dirname(storage), { recursive: true });

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
    logging: false,
  });
  connectionInfo = `SQLite at ${storage}`;
} else if (dbType === 'postgres') {
  // PostgreSQL configuration
  sequelize = new Sequelize(
    process.env.DB_NAME || 'mini_crm',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
    }
  );
  connectionInfo = `PostgreSQL at ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`;
} else if (dbType === 'mysql') {
  // MySQL configuration
  sequelize = new Sequelize(
    process.env.DB_NAME || 'mini_crm',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
    }
  );
  connectionInfo = `MySQL at ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`;
} else {
  throw new Error(`Unsupported database type: ${dbType}. Use 'sqlite', 'postgres', or 'mysql'.`);
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`✓ SQL database connected: ${connectionInfo}`);
  } catch (error) {
    console.error(`✗ SQL database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
