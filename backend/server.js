import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { getDevEnviromentVariables } from "./enviroments/env.js";
import UserRoute from "./routers/UserRoute.js";
import accommodationRoutes from "./routers/accommodationRoutes.js";
import reservationRoutes from "./routers/reservationRoutes.js";

export class Server {
  app = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.connectMongoDB();
  }

  connectMongoDB() {
    mongoose.connect(getDevEnviromentVariables().db_uri).then(() => {
      console.log("Connected to MongoDB successfully");
    });
  }

  setRoutes() {
    this.app.use("/api/users", UserRoute);
    this.app.use("/api/accommodations", accommodationRoutes);
    this.app.use("/api/reservations", reservationRoutes);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Error 404",
        statuscode: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Not found",
        statuscode: errorStatus,
      });
    });
  }
}
