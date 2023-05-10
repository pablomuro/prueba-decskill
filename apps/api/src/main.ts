import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to api!' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
