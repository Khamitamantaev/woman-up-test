const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const dbConfig = require('./config/mongodb.config')
const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./models");
const { INIT_USER } = require("./config/mongodb.config");
const User = db.user;
db.mongoose
  .connect(dbConfig.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    init();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  function init() {
    // Check db is empty
    User.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new User({
                username: INIT_USER.USER_NAME,
                email: INIT_USER.EMAIL,             
                password: bcrypt.hashSync(INIT_USER.PASSWORD, 8),
                todos: []
            }).save(error => {
                if(error) {
                    console.log("error: ", error);
                }
            })
        }
    })
  }

// Тестовый роут
app.get("/", (req, res) => {
  res.json({ message: "Welcome to WomanUp application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/todo.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});