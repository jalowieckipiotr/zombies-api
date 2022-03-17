const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cron = require("node-cron");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const zombiesRouter = require("./app/routes/zombies");
const itemsRouter = require("./app/routes/items");
const { getItems, getDailyExchanges, setGlobalRates } = require("./app/scheduled/scheduled");
const swaggerOptions = require("./docs/basic");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const connectDb = require("./app/db/connectDb");
dotenv.config();

connectDb();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
//basic routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});
app.use("/zombies", zombiesRouter);
app.use("/items", itemsRouter);

cron.schedule("0 0 0 * * *", () => {
  getItems();
  getDailyExchanges();
});
