import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import {errorHandler, notFound} from "./middleware/errorMiddleware";
// import brandRoutes from "./routes/brandRoutes"
import userRoutes from "./routes/userRoutes";
import brandRoutes from './routes/brandRoutes';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;
const app = express();

app.use(express.json())

app.get('/', (request: express.Request, response: express.Response) => {
    response.send('API is running');
});


app.use('/api/users', userRoutes);
app.use('/api/brand', brandRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running in ${ENVIRONMENT} mode on port ${PORT}`);
});
