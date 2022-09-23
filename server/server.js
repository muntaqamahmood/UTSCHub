//Use "npm run server", to run server with nodemon
const express = require('express'); 

const app = express();

app.get('/', (request, response) => response.send('Hello World'));

//Route Definitions
app.use('/api/users', require('./routes/users'));
app.use('/api/items', require('./routes/items'));
app.use('/api/auth', require('./routes/auth'));

const port = process.env.PORT || 8000; //uses either production or port 8000 for development

app.listen(port, () => console.log("Server started on port " + port));

