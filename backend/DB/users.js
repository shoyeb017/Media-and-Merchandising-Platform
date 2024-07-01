
const oracle = require("oracledb");
oracle.outFormat = oracle.OUT_FORMAT_OBJECT;

const users = [ // Dummy data
    { username: "admin", password: "admin" },
    { username: "user", password: "user" }
];

async function getUser(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

module.exports = { getUser };

