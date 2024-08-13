const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const Award = require('./models/award.model');
const Project = require('./models/project.model');
const Administrative = require('./models/administrative.model');
const Journal = require('./models/journals.model');
const Conference = require('./models/conference.model');
const Book = require('./models/books.model');
const Btechthesis = require('./models/bTech.model');
const Mtechthesis = require('./models/mTech.model');
const PhdThesis = require('./models/phd.model');
const Research = require('./models/reasearch.model');
const Ieee = require('./models/ieee.model');
const InvitedTalk = require('./models/invitedTalh.model');
const Academic = require('./models/academic.model');
const Patent = require('./models/patent.model');
const ProfessionalMembership = require('./models/membership.model');
const EditorialActivity = require('./models/editactivites.model');
const BookChapter = require('./models/bookchapters.model');
const DB_NAME = 'Cluster0';
require('dotenv').config();
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'frontend/public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// mongoose.connect("mongodb+srv://testUser:test123@cluster0.7keoo01.mongodb.net/youtube?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
// .catch(err => console.log('MongoDB connection error:', err));

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

// Add new project
app.post('/api/projects/add', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
        console.log("project added")
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all projects
app.get('/api/projects/read', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/administratives/add', async (req, res) => {
    try {
        const newAdminExperience = new Administrative(req.body);
        await newAdminExperience.save();
        res.status(201).json(newAdminExperience);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




// Read all admin experience
app.get('/api/administratives/read', async (req, res) => {
    try {
        const newAdminExperience = await Administrative.find();
        res.json(newAdminExperience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/academics/add', async (req, res) => {
    try {
        const newAcad = new Academic(req.body);
        await newAcad.save();
        res.status(201).json(newAcad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/research_collaborators/add', async (req, res) => {
    try {
        const newResearch = new ResearchCollaborator(req.body);
        await newResearch.save();
        res.status(201).json(newResearch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/patents/add', async (req, res) => {
    try {
        const newPatent = new Patent(req.body);
        await newPatent.save();
        res.status(201).json(newPatent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/professional_memberships/add', async (req, res) => {
    try {
        const newMembership = new ProfessionalMembership(req.body);
        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/editorial_activities/add', async (req, res) => {
    try {
        const newActivity = new EditorialActivity(req.body);
        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/bookChapters/add', async (req, res) => {
    try {
        const newBookChap = new BookChapter(req.body);
        await newBookChap.save();
        res.status(201).json(newBookChap);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/journals/add', async (req, res) => {
    try {
        const newJournal = new Journal(req.body);
        await newJournal.save();
        res.status(201).json(newJournal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all admin experience
app.get('/api/journals/read', async (req, res) => {
    try {
        const journal = await Journal.find();
        res.json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/conferences/add', async (req, res) => {
    try {
        const newConference = new Conference(req.body);
        await newConference.save();
        res.status(201).json(newConference);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all conference
app.get('/api/conferences/read', async (req, res) => {
    try {
        const conference = await Conference.find();
        res.json(conference);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/books/add', async(req,res) =>{
    try {
        const newBook = await Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/books/read', async(req,res) => {
   try {
    const book = await Book.find();
    res.json(book);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})

app.post('/api/btechthesis/add', async(req,res) =>{
    try {
        const newBtechthesis = await Btechthesis(req.body);
        await newBtechthesis.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/btechthesis/read', async(req,res) => {
   try {
    const btechthesis = await Btechthesis.find();
    res.json(btechthesis);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})

app.post('/api/mtechthesis/add', async(req,res) =>{
    try {
        const newMtechthesis = await Mtechthesis(req.body);
        await newMtechthesis.save();
        res.status(201).json(newMtechthesis);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/mtechthesis/read', async(req,res) => {
   try {
    const mtechthesis = await Mtechthesis.find();
    res.json(mtechthesis);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})

app.post('/api/phdthesis/add', async(req,res) =>{
    try {
        const newphdthesis = await PhdThesis(req.body);
        await newphdthesis.save();
        res.status(201).json(newphdthesis);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/phdthesis/read', async(req,res) => {
   try {
    const phdthesis = await PhdThesis.find();
    res.json(phdthesis);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})

app.post('/api/researches/add', async(req,res) =>{
    try {
        const newResearch = await Research(req.body);
        await newResearch.save();
        res.status(201).json(newResearch);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/researches/read', async(req,res) => {
   try {
    const researches = await Research.find();
    res.json(researches);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})

app.post('/api/ieeeservices/add', async(req,res) =>{
    try {
        const newService = await Ieee(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/ieeeservices/read', async(req,res) => {
   try {
    const service = await Ieee.find();
    res.json(service);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})

app.post('/api/invitedtalk/add', async(req,res) =>{
    try {
        const newTalk = await InvitedTalk(req.body);
        await newTalk.save();
        res.status(201).json(newTalk);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
})

app.get('/api/invitedtalk/read', async(req,res) => {
   try {
    const newTalk = await InvitedTalk.find();
    res.json(newTalk);
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
})
// Serve the admin experience

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 1335;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
