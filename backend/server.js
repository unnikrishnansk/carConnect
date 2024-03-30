import express from 'express';
import dotenv from 'dotenv';    
import cors from 'cors';  
dotenv.config();   
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatRoutes from './routes/chatRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// import { Server } from 'http';
// import { Server as SocketIOServer } from 'socket.io';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const port = process.env.PORT || 5000;   
   

connectDB();
const app = express();

// const http = new Server(app);

app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true, // if you need to send cookies or authentication headers
  }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/', express.static(path.join(__dirname,'uploads')));

// const io = new SocketIOServer(http, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

// //Add this before the app.get() block
// io.on('connection', (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);
//     //Listens and logs the message to the console
//     socket.on('message', (data) => {
//         io.emit('messageResponse', data);
//       });

//     socket.on('disconnect', () => {
//       console.log('🔥: A user disconnected');
//     });
// });


app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);


app.get('/', (req, res) => {
    res.send("Server is up and running.");
})

app.use(notFound);
app.use(errorHandler);  
app.listen(port, () => {
    console.log(`[server] Listening on http://localhost:${port}`);
})
