require('dotenv').config();
const connectDB = require('./config/db');

const testConnection = async () => {
    try {
        await connectDB();
        console.log('Database connection test successful');
    } catch (error) {
        console.error('Database connection test failed:', error);
    }
};

testConnection();