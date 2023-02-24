const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(
      `DB connected (ready state: ${mongoose.connection.readyState})`
    );
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  }
);
