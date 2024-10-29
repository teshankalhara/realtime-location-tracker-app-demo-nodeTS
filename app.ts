// src/index.ts
import express, { Request, Response } from 'express'
import http from 'http'
import path from 'path'
import { Server as SocketIO } from 'socket.io'
import LocationModel from './models/LocationModel'
import connectDB from './config/db'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)

connectDB()

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id)

    socket.on("send-location", async (data: { latitude: string, longitude: string }) => {
        try {
            const location = new LocationModel(data)
            await location.save()
            console.log("Location saved:", location)
            io.emit("receive-location", { id: socket.id, ...data })
        } catch (error) {
            console.error("Error saving location:", error)
        }
    })

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
        console.log("User disconnected:", socket.id)
    })
})

app.get("/", (req: Request, res: Response) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})
