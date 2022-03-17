const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dotenv = require('dotenv');
const cron = require('node-cron');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const zombiesRouter = require("./app/routes/zombies");
const itemsRouter = require("./app/routes/items");
const { getItems, getDailyExchanges, setGlobalRates } = require("./app/scheduled/scheduled");
dotenv.config();

connectDb();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Zombie API",
            description: "Simple CRUD Zombie API",
            version: "1.0.0",
            contact: {
                name: "Piotr Jalowiecki",
                email: "jalowieckipiotr@gmail.com"
            },
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./app/routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.json({ "message": "Server running" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);

});
app.use("/zombies", zombiesRouter);
app.use("/items", itemsRouter);

cron.schedule("0 0 0 * * *", () => {
    getItems();
    getDailyExchanges();
});

function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true
        })
        console.log("Successfully connected to the database");
        setGlobalRates();
    }
    catch (err) {
        console.log('Could not connect to the database. Error...', err);
        process.exit();
    }
}

