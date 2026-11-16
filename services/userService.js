const crypto = require('crypto');
const { promisify } = require('util');

const scrypt = promisify(crypto.scrypt);

// User class
class User {
    constructor(id, name, email, passwordHash, salt, role = 'user') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.role = role;
    }
}

// In-memory user collection
const users = [];

let nextUserId = 1;

// Register a new user
async function registerUser(name, email, password) {
    const existingUser = users.find(
        user => user.email === email.toLowerCase()
    );

    if (existingUser) {
        throw new Error('An account with this email already exists.');
    }

    const salt = crypto.randomBytes(16).toString('hex');

    const passwordHash = await scrypt(password, salt, 64);

    const newUser = new User(
        nextUserId++,
        name,
        email.toLowerCase(),
        passwordHash.toString('hex'),
        salt
    );

    users.push(newUser);

    return newUser;
}

// Find a user by email
function findUserByEmail(email) {
    return users.find(
        user => user.email === email.toLowerCase()
    );
}

// Verify a user's password
async function verifyPassword(user, password) {
    const passwordHash = await scrypt(password, user.salt, 64);

    const storedHash = Buffer.from(user.passwordHash, 'hex');

    return crypto.timingSafeEqual(passwordHash, storedHash);
}

// Create the initial administrator account
async function createAdminAccount() {
    const email = 'admin@moviehub.com';

    const existingAdmin = findUserByEmail(email);

    if (existingAdmin) {
        return;
    }

    const admin = await registerUser(
        'MovieHub Admin',
        email,
        'AdminMovieHub123'
    );

    admin.role = 'admin';

}

module.exports = {
    User,
    registerUser,
    findUserByEmail,
    verifyPassword,
    createAdminAccount
};