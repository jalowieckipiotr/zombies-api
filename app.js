const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const zombiesRouter = require("./app/routes/zombies");
const itemsRouter = require("./app/routes/items");
const swaggerOptions = require("./docs/basic");
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const connectDb = require("./app/db/connectDb");
dotenv.config();

connectDb();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//basic routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});
app.use("/zombies", zombiesRouter);
app.use("/items", itemsRouter);



module.exports = app;
