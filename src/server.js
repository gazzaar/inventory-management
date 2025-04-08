import express from 'express';
import dotend from 'dotenv';
dotend.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server started ');
});
