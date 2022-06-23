const username = "bkAppDBUsername";
const password = "ja60fjwKkc8uHmqhZADuPYJYc202RV8q";
const dbName = "bk-database";

var db = connect(`mongodb://${username}:${password}@localhost:27017/admin`);
db = db.getSiblingDB(dbName);

db.createUser(
    {
        user: username,
        pwd: password,
        roles: [{ role: "readWrite", db: dbName }],
        passwordDigestor: "server",
    }
)

db.users.drop();
db.users.insertMany([
    {
        username: "bk",
        password: "GfRhBy8k4S5qSseyhAqWUA==",
        permission: 1000
    }
])