import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import signUp from './routes/user.routes.js';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.use(signUp)

const port = process.env.PORT || 5023
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})