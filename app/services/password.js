import dumbPasswords from 'dumb-passwords';
import bcrypt from 'bcrypt-nodejs';

const comparePasswords = (newPass, confirmNewPass) => newPass === confirmNewPass;

const checkWorstPassword = password => dumbPasswords.check(password);

const checkPassword = (user, newPassword) => bcrypt.compareSync(newPassword, user.password);

const generatePassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

export {
    comparePasswords,
    checkWorstPassword,
    checkPassword,
    generatePassword,
};
