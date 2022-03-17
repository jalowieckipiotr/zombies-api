const app = require("./app.js");
const cron = require("node-cron");
const { getItems, getDailyExchanges } = require("./app/scheduled/scheduled");

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

cron.schedule("0 0 0 * * *", () => {
  getItems();
  getDailyExchanges();
});
