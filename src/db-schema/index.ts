import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import config from '../config';

const env: string = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db: any = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== 'index.js' && !file.includes('js.map');
  })
  .forEach(function(file) {
    const model: any = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;