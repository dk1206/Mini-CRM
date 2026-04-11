const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lead = sequelize.define(
  'Lead',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      set(value) {
        this.setDataValue('email', String(value).trim().toLowerCase());
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    source: {
      type: DataTypes.ENUM('Website', 'LinkedIn', 'Referral', 'Other'),
      allowNull: false,
      defaultValue: 'Website',
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'converted'),
      allowNull: false,
      defaultValue: 'new',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
  },
  {
    tableName: 'leads',
    underscored: true,
    timestamps: true,
  }
);

module.exports = Lead;
