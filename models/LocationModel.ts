import mongoose, { Document, Schema } from 'mongoose'

interface ILocation extends Document {
    latitude: string
    longitude: string
    time?: Date
}

const locationSchema: Schema = new Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
})

const LocationModel = mongoose.model<ILocation>('LocationD', locationSchema)

export default LocationModel