
import app from "./app";
import { connectDB } from "./config/db";
import { ENV } from "./config/env";
import fs from "fs";
import path from "path";

const startServer = async () => {
  try {
    const uploadsPath = path.join(__dirname, "..", "uploads");

    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath);
    }

    await connectDB();

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
