const express = require("express");
const Pizza = require('./models/pizzaModel')
const app = express();

const mongoose = require("mongoose");

const path = require('path')
const cors = require('cors');

require ("dotenv").config()

app.use(cors({
    origin:"*"
}))
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const pizzasRoute = require('./routes/pizzasRoute')
const userRoute = require('./routes/userRoute')
const ordersRoute = require('./routes/ordersRoute')

app.use('/api/pizzas/', pizzasRoute)
app.use('/api/users/' , userRoute)
app.use('/api/orders/' , ordersRoute)



app.get("/", (req, res) =>
res.send(`Server Running`)
);
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

