const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const User = require('../models/user');

const createUser = async (data) => {
    try {
        const { first_name, last_name, email, password, phone, user_type } = data;
        const oldUser = await User.findOne({
            where: { email: email }
        });
        if (oldUser) {
            throw new Error('email already registered, please login');
        }

        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const user_id = v4();
        const profile_image = `https://api.multiavatar.com/${first_name}.svg`
        const user = await User.create({ user_id, email, password, first_name, last_name, phone, profile_image, user_type, password: hashedPass });
        delete user?.dataValues?.password;
        return user;
    } catch (err) {
        throw err
    }
};

const loginUser = async (data) => {
    try {
        const { email, password } = data;
        const user = await User.findOne({
            where: { email: email }
        });
        if (!user) {
            throw new Error('wrong credentials, please try again with correct credentials');
        }
        // CHECKING PASSWORD
        const isPasswordValid = await bcrypt.compare(password, user?.password);
        if (!isPasswordValid) {
            throw new Error('Invalid Password, Please try again!');
        }
        delete user.dataValues.password;
        return user;
    } catch (err) {
        throw err
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findOne({
            where: { user_id: id, is_active: true }
        });

        console.log("User", user);
        if (!user) {
            throw new Error('User not found');
        }

        const data = { user_id: user.user_id, email: user.email, first_name: user.first_name, last_name: user.last_name, phone: user.phone, profile_image: user.profile_image, user_type: user.user_type }
        return data;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    loginUser,
    getUserById,
}