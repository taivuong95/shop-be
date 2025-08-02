import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './modules/user/user.route.js';
import mongo from './lib/mongoose.lib.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);

mongo.connect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
