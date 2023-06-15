const express = require('express');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sessions = require('express-session');
const handles = require('express-handlebars');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(sessions.Store);

const PORT = process.env.PORT || 3001;
const app = express();

const hbs = handles.create({helpers});

const sess = {
    secret: 'shh',
    cookie: {
        maxAge: 5000000,
        httpOnly: true,
        secure:false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db:sequelize
    })
};

app.use(sessions(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
});

