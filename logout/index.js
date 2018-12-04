module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    
    if(myTimer.isPastDue)
    {
        context.log('Logout failed.');
    }

    var mongoose = require('mongoose');

    const user = 'h0gw3q';
    const password = 'TICr9j7h4hUMOI4iHRcXowGBKCrXnkQf9mAVNN9otcOUH8xkMAYOYHSXWreHNJ9x6whaPswS761YhGy8BzzISA==';
    const connectionString = `mongodb://${user}.documents.azure.com:10255/hf`;

    mongoose.connect(`${connectionString}?ssl=true&replicaSet=globaldb`, {
        auth: {
            user: user,
            password: password
        },
        useNewUrlParser: true
    })
    .then((conn) => {
        console.log('successfully connected to the database (login model)')
        var loginSchema = mongoose.model('loggedIn', new mongoose.Schema({
            _class: String,
            email: String,
            loggedInTime: Number
        }), 'logindata');

        loginSchema.deleteMany({
            _class: '_logged.d'
        }, (err) => {
            return;
        })

    })
    .catch(err => {
        console.log(err)
        console.log('unable to connect to the database (login model)')
    })
};