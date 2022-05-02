import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import socketHandler from './module/socket.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{ cors: { origin: '*' }});

app.use(express.json()) ;
app.use(cors()) ;

io.on('connection',socketHandler); 

app.use('/', express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

async function startApp() {
    try {
        httpServer.listen(3333, () => {
            console.log('Application listening on port 3333!')
        });
    } catch (e) {
        console.log(e);
    }
}
startApp();

export {io};