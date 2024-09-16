const mongoose = require('mongoose');


const dbConnection = async() => {
    try{
        await mongoose.connect( process.env.DB_CNN,{} );
        console.log( 'Db is connected' );
    }catch( error ){
        console.log( error );
        throw new Error('Error in connection with Date base');
    }
}

module.exports = {
    dbConnection,
}