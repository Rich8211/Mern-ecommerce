const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(express.json());
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true
    })
);
app.use(cookieParser("secretcode"));

app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

connectDB();

app.listen(PORT, console.log(`Server running on port ${PORT}`));