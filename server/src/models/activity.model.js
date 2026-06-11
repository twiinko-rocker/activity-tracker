import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
})

export default mongoose.model('Activity', activitySchema);