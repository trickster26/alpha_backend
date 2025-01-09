const argon2 = require('argon2');

// Consistent hashing configuration
const hashingConfig = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16, // 64MB
  timeCost: 3, // number of iterations
  parallelism: 1 // degree of parallelism
};

exports.hashPassword = async (password) => {
  try {
    return await argon2.hash(password, hashingConfig);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

exports.verifyPassword = async (hashedPassword, candidatePassword) => {
  try {
    return await argon2.verify(hashedPassword, candidatePassword);
  } catch (error) {
    return false;
  }
}; 