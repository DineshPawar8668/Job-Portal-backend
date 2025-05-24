const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const corsOptions = {
  // origin: 'https://job-portal-frontend-bay-psi.vercel.app/api'
  origin: 'https://job-portal-frontend-86ph.onrender.com/',
  credentials: true,
};

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
