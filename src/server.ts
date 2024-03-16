import express from "express";
import logger from "./middleswares/logger.js";
import sessions from "./middleswares/sessions.js";
import usersController from "./controllers/users_controller.js";
import sessionsController from "./controllers/sessions_controller.js";
import savedJobsController from "./controllers/savedJobs_controller.js";
import cors, { CorsOptions } from "cors";
// import path from "path";
const whitelist = [
  "http://localhost:3000",
  "https://jobtracker-ts.netlify.app",
];
var corsOptions: CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },

  exposedHeaders: ["Authorization", "Access-Control-Allow-Origin", "Access"],

  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "OPTIONS"],
  preflightContinue: false,
  //add this header to allow the browser to send the token to the server, possibly solve the cors issue -does not have ok status
  optionsSuccessStatus: 200,
  credentials: true,
};
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server listening to port ${PORT}`));

app.use(logger);
app.use(express.json());
app.use(sessions);
app.use(cors(corsOptions));
app.use("/api/users", usersController);
app.use("/api/sessions", sessionsController);

//providing apikey for search jobs in adzuna
app.use("/api/search", (req, res) => {
  const app_key = process.env.REACT_APP_adzuna_api_key;
  res.json(app_key);
});

//save jobs
app.use("/api/save", savedJobsController);

//for production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "build")));

//   app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//   });
// }
