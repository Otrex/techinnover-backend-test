import { join } from "path";

export default {
  app: {
    name: process.env.APP_NAME!,
    env: process.env.APP_ENV! || "development",
    staticFilePath: join(__dirname, "..", "static")
  }
}