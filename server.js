import mongoose from "mongoose";
import app from "./app.js";
// jGHG7ocW0GyNMHXS

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server is running. Use our API on port: ${PORT}. `
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
