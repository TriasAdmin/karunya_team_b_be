import { App } from "./app";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const EPIC = await process.env.MY_VARIABLE;
  const app = new App(EPIC || 3019);
  await app.listen();
}

main();