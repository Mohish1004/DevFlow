import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'DevFlow API Backend is running successfully.',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`DevFlow backend listening at http://localhost:${port}`);
});
