const express = require("express");
const cors = require("cors");

const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Тестовый роут
app.get("/", (req, res) => {
  res.json({ message: "Welcome to WomanUp application." });
});

console.log(process.env.PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});