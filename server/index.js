require('dotenv').config({ path: __dirname + '/.env' });
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const mongoSanitize = require("express-mongo-sanitize");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const PORT = process.env.PORT || 5000;
const app = express();
const connStr = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_IMAGE_NAME}:27017/${process.env.COLLECTION_NAME}`;
const connParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
};
global.serverRoot = path.resolve(__dirname);
const PERMISSIONS = require('./common/PermissionLevels');
global.log = (msg) => { console.log(msg) }

const authRouter = require("./routers/auth");
const tokenRouter = require("./routers/token");

const authMiddleware = require("./controller/auth/verifyToken");
const apiKeyMiddleware = require("./controller/auth/apiKeyCheck");

const Init = async () => {
    try {
        await mongoose.connect(connStr, connParams)
        app.use(bodyParser.json());
        app.use(cors());
        app.use(mongoSanitize({ replaceWith: "_" }));
        app.use("/api/auth", authRouter);
        app.use("/api/token", tokenRouter);
        // app.use("/api/test", authMiddleware(PERMISSIONS.ADMIN), testRouter);
        // app.use("/api/countries", apiKeyMiddleware, rapydCountriesRouter);
        app.listen(PORT, (output) => { console.log("Server started port : " + PORT); });
    }
    catch (e) {
        global.log(`Error : ${e}`);
    }
}

Init();

