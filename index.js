import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import config from "./src/config/environment.js";

app.listen(config.port, () =>
  console.log("Server running on port", config.port)
);
connectDB();
