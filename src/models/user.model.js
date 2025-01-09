const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const argon2 = require('argon2');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lastLogin: {
    type: DataTypes.DATE
  }
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        user.password = await argon2.hash(user.password);
      }
    }
  }
});

// Instance method to verify password
User.prototype.isPasswordMatch = async function(candidatePassword) {
  try {
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    return false;
  }
};

module.exports = User; 