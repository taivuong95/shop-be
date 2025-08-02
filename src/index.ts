import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRoutes from './modules/user/user.route.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
