const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.authPath = '/api/auth'

        //Connect to Dtabase
        this.connectDB();

        //Middlewares
        this.middlewares();

        //end Middlewares


        this.routes();

    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        // read and Write Body
        this.app.use( express.json() );

        //public dirs
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.userPath, require('../routes/user'));
    }

    listen(){
        
this.app.listen(this.port, () => {
    console.log(`Servidor correindo en Puerto ${this.port}`);
  });
    }

}

module.exports = Server;