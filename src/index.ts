// src/app.ts
import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
