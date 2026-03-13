const express = require("express");
const db = require("./models");
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 3001;

// Parse JSON payloads
app.use(express.json());

// Parse URL-encoded payloads (form data)
app.use(express.urlencoded({ extended: true }));

// api routes
app.use("/api", router);

// (async () => {
//   try {
//     await db.sequelize.sync({ alter: true });

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
//   } catch (e) {
//     console.log("Error Whilte syncing database :", e);
//   }
// })();
