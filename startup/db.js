const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');

const dbPass = 'admin0112358';
const connectionURI = `mongodb+srv://admin:${dbPass}@cluster0-mu3jl.mongodb.net/test?retryWrites=true`;

module.exports = () => {
    mongoose.connect(connectionURI, { useNewUrlParser: true })
        .then(() => dbDebugger('connected to MongoDB...'));

}
