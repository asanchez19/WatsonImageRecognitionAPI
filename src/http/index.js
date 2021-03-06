const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookie = require('cookie-parser');
const body = require('body-parser');
var multer = require('multer');
var upload = multer();
const { main } = require('../routes');

/*
* HTTP server class.
*/
exports.HTTP = class HTTP {


  /*
  * Class constructor.
  */
  constructor({ config } = {}) {
    this.config = config;
    this.app = null;
    this.server = null;
  }


  /*
  * Returns a promise which starts the server.
  */
  async listen() {

    if (this.server) return this;

    // Express configuration
    this.app = express();
    this.app.use(morgan('dev'))
    this.app.use(cookie())
    this.app.use(body.json())
    this.app.use(body.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(helmet())
    this.app.disable('x-powered-by')
    /** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
    const type = upload.single('image');

    //Route configuration
    this.app.use('/', type, main)


    await new Promise((resolve) => {
      let { httpPort, httpHost } = this.config;
      this.server = this.app.listen(httpPort, httpHost, resolve);
    });
  }


  /*
  * Returns a promise which stops the server.
  */
  async close() {
    if (!this.server) return this;

    await new Promise((resolve) => {
      this.server.close(resolve);
      this.server = null;
      this.app = null;
    });
  }

}
