import express from 'express'
import http from 'http'
import path from 'path'
import { Server as SocketIO } from 'socket.io'
import routes from './routes/index'

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// Use the routes
app.use('/', routes)

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id) // Optional: log the user connection

    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data })
    });

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id)
        console.log('User disconnected:', socket.id) // Optional: log user disconnection
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})
