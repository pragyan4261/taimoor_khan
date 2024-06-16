const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/user.model');
const Award = require('./models/award.model');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'frontend/public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));;

// const awardSchema = new mongoose.Schema({
//     year: String,
//     name: String,
//     organisation: String
// });

// const Award = mongoose.model('Award', awardSchema);

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                _id: user._id
            },
            process.env.JWT_SECRET
        );

        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

// Add new award endpoint
app.post('/api/awards/add', async (req, res) => {
    try {
        const newAward = new Award(req.body);
        await newAward.save();
        res.status(201).json(newAward);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all awards endpoint
app.get('/api/awards/read', async (req, res) => {
    try {
        const awards = await Award.find();
        res.json(awards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 1335;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
