const express = require("express");
const dotenv = require("dotenv");
const databse = require("./config/database");

dotenv.config();

databse.connect();

const routesClient = require("./routes/client/index.route");


const app = express();
const port = process.env.PORT;



app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes Client
routesClient(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});