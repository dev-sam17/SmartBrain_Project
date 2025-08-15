const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: 1,
      email: "john@example.com",
      password: "example",
      entries: 0,
    },
  ],
};

app.get("/", (req, res) => {
  res.json(database.users);
});

app.get("/profile/:id", (req, res) => {
  const id = +req.params.id;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    return res.json({ message: "user not found" });
  }
});

app.post("/signin", (req, res) => {
  let foundUser = false;

  for (let i = 0; i < database.users.length; i++) {
    if (
      req.body.email === database.users[i].email &&
      req.body.password === database.users[i].password
    ) {
      foundUser = true;
      break; // Break the loop once a matching user is found
    }
  }

  if (foundUser) {
    res.json("success");
  } else {
    res.status(400).json("signin failed");
  }
});

app.post("/signup", (req, res) => {
  const { email, password, name } = req.body;
  database.users.push({
    id: database.users.length + 1,
    email,
    password,
    name,
    entries: 0,
  });
  res.json("signup successful");
});

app.post("/imageurl", (req, res) => {
  const { input } = req.body;
  
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": process.env.CLARIFAI_USER_ID,
        "app_id": process.env.CLARIFAI_APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": input
                }
            }
        }
    ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + process.env.CLARIFAI_PAT
      },
      body: raw
  };

  fetch(`https://api.clarifai.com/v2/models/${process.env.CLARIFAI_MODEL_ID}/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(error => res.status(400).json('Unable to work with API'));
});

app.put("/image", (req, res) => {
  const id = +req.body.id;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    return res.json({ message: "user not found" });
  }
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
