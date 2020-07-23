const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const profile = require("./routes/api/profile");
const post =  require("./routes/api/post");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json( {extended: true})); // why extended false? lOOOK THIS UP

app.get('/api/test', (req, res) => {
  res.send('Successfully');
})

app.get('/', (req, res) => res.send('API Running'));
// Define Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use("/api/profile", profile);
app.use('/api/post', post);

const PORT = process.env.PORT || 3000


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


