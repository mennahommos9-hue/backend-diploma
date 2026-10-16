require("dotenv").config();
const AppDataSource = require("./config/db");
const app = require("./app")

AppDataSource.initialize()
  .then(() => {
    console.log("data server has been connected...");
  })
  .catch((err) => {
    console.log("data server connection error => ", err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on ${port}...`);
});
