import mongoose from 'mongoose';
// set mongoose Promise to Bluebird
mongoose.Promise = global.Promise;
// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

exports.connect = (envConfig, env) => {
    if (env === 'development') {
        mongoose.set('debug', true);
    }
    mongoose.connect(envConfig.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    return mongoose.connection;
};