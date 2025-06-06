const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const session = require("express-session");

const dbConnect = require("./config/Connect");

const UserRouter = require("./routes/user.route");
const PhotoRouter = require("./routes/photo.route");
const AdminRouter = require("./routes/admin.route");

dbConnect();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

// Session configuration
app.use(session({
    secret: 'photo-sharing-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use("/admin", AdminRouter);

app.use("/user", UserRouter);
app.use("/photo", PhotoRouter);

app.get("/", (request, response) => {
    response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8080, () => {
    console.log("server listening on port 8080");
});
