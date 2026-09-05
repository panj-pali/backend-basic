import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config();

connectDB();














/*
dotenv.config();

const app = express();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    app.on("error", (err) => {
      console.log(err);
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
*/