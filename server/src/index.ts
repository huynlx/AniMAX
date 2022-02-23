import express from "express";
import cors from 'cors';
import path from "path";

import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";
import cache from "./middlewares/cache";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //đọc req.body của post request

app.use(cache(3600));
app.use("/api/v1", routes);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "build")));

// @ts-ignore
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});




