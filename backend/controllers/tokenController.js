const Token = require('../models/model');

// Generate an eight-digit token
const generateToken = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Generate the token
exports.generateToken = async (req, res) => {
    const { amount, meterNumber } = req.body;

    // Validate amount and meterNumber
    if (!amount || !meterNumber) {
        return res.status(400).json({ error: 'Amount and meterNumber are required.' });
    }

    if (amount < 100 || amount % 100 !== 0) {
        return res.status(400).json({ error: 'Amount must be 100 or a multiple of 100.' });
    }

    if (amount > 182500) {
        return res.status(400).json({ error: 'Amount exceeds the maximum of 182,500.' });
    }

    const days = amount / 100;
    const token = generateToken();

    try {
        const newToken = new Token({
            meter_number: meterNumber,
            token,
            token_value_days: days,
            amount,
        });
        await newToken.save();
        res.status(200).json({ token, days });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
};

// Validate token
exports.validateToken = async (req, res) => {
    const { token } = req.body;

    // Validate token
    if (!token) {
        return res.status(400).json({ error: 'Token is required.' });
    }

    try {
        const foundToken = await Token.findOne({ token });
        if (!foundToken) {
            return res.status(404).json({ error: 'Token not found!' });
        }
        if (foundToken.token_status === 'USED') {
            return res.status(400).json({ error: 'Token already used.' });
        }
        res.status(200).json({ days: foundToken.token_value_days });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error!' });
    }
};

// Token history
exports.getTokenHistory = async (req, res) => {
    const { meterNumber } = req.body;

    // Validate meterNumber
    if (!meterNumber) {
        return res.status(400).json({ error: 'Meter number is required.' });
    }

    try {
        const tokens = await Token.find({ meter_number: meterNumber });
        res.status(200).json({ tokens });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error!' });
    }
};
