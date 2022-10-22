//Use "npm run server", to run server with nodemon
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();

const uri = "mongodb+srv://UTSCHub_Admin:LGMSRdTNPrdVjEw9@cluster0.pcmxj1f.mongodb.net/?retryWrites=true&w=majority"

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

app.use(cors());

// Initialize middleware
app.use(express.json({extended: false}));

app.get('/', (request, response) => response.send('Hello World'));

//Route Definitions
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/postevent', require('./routes/postevent'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/events', require('./routes/events'));

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8000; //uses either production or port 8000 for development

app.listen(port, () => console.log("Server started on port " + port));

