const roleTypes = require("./roleTypes");

module.exports = [
    {
        name: "Login",
        method: "POST",
        path: "/login",
        roles: [roleTypes.DEFAULT]
    },
    {
        name: "Register",
        method: "POST",
        path: "/login",
        roles: [roleTypes.DEFAULT]
    },
    {
        name: "Something",
        method: "POST",
        path: "/something",
        roles: [roleTypes.USER]
    },
    {
        name: "Something",
        method: "GET",
        path: "/something",
        roles: [roleTypes.ADMIN]
    }
]