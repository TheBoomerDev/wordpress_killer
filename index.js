const express = require('express')
const cors    = require('cors')
const path    = require('path')
const hbs     = require('express-hbs')
const tools   = require('./screens/features/common/tools')

require('dotenv').config() // Fichero de configuración
tools.initTools() // Initial Common Tools

// =============== MONGODB
const mongoose = require('mongoose')
const database = process.env.MONGODB
mongoose.connect(database)
  .then((data) => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.error(err)
  })

const app = express();

// ================ TEMPLATES
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const dirViews = path.join(__dirname, 'views')
const dirPartials = path.join(dirViews, 'partials')
app.engine('hbs', hbs.express4({
  partialsDir: dirPartials
}));
app.set('view engine', 'hbs');
app.set('views', dirViews);

// ================ BODY + Public
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// ================ CORS
app.all('*', cors());
app.use(cors());

// =============
// == Routes ===
// =============
app.use('/', require('./screens/home.routes'))

// ================ 404
app.use('*', function (req, res, next) {
  var pjson = require('./package.json');

  let obj = {
    version: pjson.version,
    name: pjson.name,
  }

  return res.status(200).json(obj);
})

// =============
// == Port =====
// =============
const port = process.env.PORT || 3000

const http = require('http');
const server = http.createServer(app);
server.listen(port, () => { console.log("PROD Puerto: http://localhost:" + port); })