"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
// import brandRoutes from "./routes/brandRoutes"
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
dotenv_1.default.config();
db_1.default();
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;
const app = express_1.default();
app.use(express_1.default.json());
app.get('/', (request, response) => {
    response.send('API is running');
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/brand', brandRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server running in ${ENVIRONMENT} mode on port ${PORT}`);
});
