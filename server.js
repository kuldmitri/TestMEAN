require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from 'passport';
import fs from 'fs';
import flash from 'connect-flash';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import favicon from 'serve-favicon';
import redis from 'redis';
import connectionRedis from 'connect-redis';
import routes from './app/routes';
import initPassport from './app/passport/passport-init';
import config from './app/config/development';
const app = express();
const redisStore = connectionRedis(session);
const client = redis.createClient();

mongoose.connect(`${config.mongoDB.host}:${config.mongoDB.port}/${config.mongoDB.dbName}`);
mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'development') {
    console.log("DEV");
}

if(process.env.NODE_ENV === 'production') {
    console.log("PROD");
}

client.on('connect', function() {
    console.log('Connected to Redis');
});

client.on('error', err => {
    console.log('Redis error: ' + err);
});

app.use(favicon(path.join(__dirname, '/favicon.png')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(
  session({
    secret: config.session.secret,
    store: new redisStore(config.redis),
    saveUninitialized: true,
    resave: true,
    cookie: { httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors());

app.use('/', routes);

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

initPassport(passport);

const port = process.env.PORT;
app.listen(port);

export default app;
