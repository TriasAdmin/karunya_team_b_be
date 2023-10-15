import { PORT_SETTINGS } from "./constant";
import * as HACKATHON from "./routes/hackathon.routes";
const express = require("express");
const { Application } = require ("express");
const cors = require ("cors");
var bodyParser = require('body-parser')
var corsOptions ={
  origin: "*",
  method:["GET","PUT","POST","DELETE","OPTIONS"],
  preflightcontinue:true,
  exposeHeaders:["Content-Type","Etag","Date","Connection"]
}  

export class App {
  private app;
  public PORT_SETTINGS = PORT_SETTINGS

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    console.log("All Server Modules are loaded");
  }

  settings() {
    this.app.set("port", this.port || 3019);
    this.app.use(cors(corsOptions))
    this.app.use(bodyParser.json())
    this.routes();
  }


  async routes() {  
   await this.app.use(HACKATHON.default); 
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log(
      "Server is currently running on port:",
      this.app.get("port")
    );
  }
}
