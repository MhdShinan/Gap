const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require('./utils/passport');
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const user = require("./controller/userController");
const settings = require("./controller/settingController");
const profile = require("./controller/userProfile");
const landing = require("./controller/landingPageController");
const mentor = require("./controller/mentorController");
const googleSign = require('./controller/googleSign');
const timeSlot = require("./controller/timeSlotController"); 
const TimeSlot = require('./models/timeSlotModel');

const meeting = require("./controller/meetingController")
const sessionRoutes = require('./controller/sessionController');

const timeSlotRouter = require('./controller/timeSlotController'); // Keep this
// const timeSlotRouter = require('./models/timeSlotModel'); // Remove this line




const app = express();
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, ".env") }); // Define the path to your .env file
}

app.use(
  cors({
    origin: process.env.CLIENT_URL_TEST,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.static("public/images"));
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["generationalpha"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", user);
app.use("/api", settings);
app.use("/api", profile);
app.use("/api", landing);
app.use("/api", mentor);
app.use('/api', timeSlotRouter); // Register the time slot routes
app.use("/auth", googleSign);
app.use("/api", meeting);
app.use('/api/sessions', sessionRoutes);

module.exports = app;
