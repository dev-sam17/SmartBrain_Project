const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

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

// API Routes
app.get("/api", (req, res) => {
  res.json(database.users);
});

app.get("/api/profile/:id", (req, res) => {
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

app.post("/api/signin", (req, res) => {
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

app.post("/api/signup", (req, res) => {
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

app.post("/api/imageurl", (req, res) => {
  const { input } = req.body;
  
  console.log('Received input type:', input.startsWith('data:') ? 'base64' : 'url');
  console.log('Input length:', input.length);
  
  // Determine if input is a URL or base64 data
  let imageData;
  if (input.startsWith('data:')) {
    // Base64 image data from file upload
    const base64Data = input.split(',')[1];
    console.log('Base64 data length:', base64Data.length);
    imageData = {
      "base64": base64Data
    };
  } else {
    // URL
    console.log('Processing URL:', input.substring(0, 50) + '...');
    imageData = {
      "url": input
    };
  }
  
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": process.env.CLARIFAI_USER_ID,
        "app_id": process.env.CLARIFAI_APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": imageData
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
    .then(result => {
      console.log('Clarifai response status:', result.status);
      if (result.outputs && result.outputs[0] && result.outputs[0].data) {
        console.log('Regions found:', result.outputs[0].data.regions ? result.outputs[0].data.regions.length : 0);
      }
      res.json(result);
    })
    .catch(error => {
      console.error('Clarifai API error:', error);
      res.status(400).json('Unable to work with API');
    });
});

app.put("/api/image", (req, res) => {
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

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
  console.log("Serving React app from build folder");
});
