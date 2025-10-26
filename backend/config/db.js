import mongoose from 'mongoose';
const connectDB = async () => {
    if (!process.env.MONGODB_ATLAS_URI) {
        throw new Error('MONGODB_ATLAS_URI is not defined in environment variables');
    }

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        heartbeatFrequencyMS: 1000, // Check connection every second
    };

    try {
        console.log('Attempting to connect to MongoDB...');
        
        // Add event listeners before connecting
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('connected', () => {
            console.log('Successfully connected to MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

        await mongoose.connect(process.env.MONGODB_ATLAS_URI, options);
        
        // Test the connection by trying to get the list of collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`Successfully connected to database. Found ${collections.length} collections.`);

    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if (error.code) {
            console.error('Error code:', error.code);
        }
        throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }
};


export default connectDB;