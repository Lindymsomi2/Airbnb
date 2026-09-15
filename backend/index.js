import mongoose from "mongoose";
import express from "express";
import { getDevEnviromentVariables } from "./enviroments/env.js";
import { Server } from './server.js'

let server = new Server().app;

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

const PORT = 5001;

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
