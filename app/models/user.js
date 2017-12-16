require('dotenv').config();
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.generateJWT = user => {
  const expiresIn = '7d';
  const payload = {
    id: user._id,
    username: user.username,
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

userSchema.methods.validPasswrod = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

userSchema.methods.generatePassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const User = mongoose.model('User', userSchema);

export default User;