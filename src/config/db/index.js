const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://qaker:12332145@remo.r0zdu.mongodb.net/remo?retryWrites=true&w=majority`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        });
        console.log('connect successfully!!!');
    } catch (error) {
        console.log('default !!!');
    }
}

module.exports =  connect;