const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    meter_number: {
        type: String,
        required: true,
        length: 6
    },
    token: {
        type: String,
        required: true,
        length: 8
    },
    token_status: {
        type: String,
        enum: ["USED", "NEW", "EXPIRED"],
        default: "NEW"
    },
    token_value_days: {
        type: Number,
        length: 11,
        required: true
    },
    purchased_date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        length: 11,
        required: true
    }
})

module.exports = mongoose.model('Token', TokenSchema);