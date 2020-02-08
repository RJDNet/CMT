const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Imported routes
const authRoutes = require('./routes/auth-routes');
const blogRoutes = require('./routes/blog-routes');
const shopRoutes = require('./routes/shop-routes');

// Next imports
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// DB Imports
const mongoose = require('mongoose');

// Model Imports
const Pkey = require('./models/pkey');

// Middleware
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
// const csrf = require('csurf');
// const csrfProtection = csrf();
const rateLimit = require("express-rate-limit");

// Global Variables
//const { secretOrKey1, secretOrKey2, mongoURI } = require('./config/keys');
const { mongoURI, secretOrKey1, secretOrKey2 } = process.env;
const PORT = process.env.PORT || 5000;

// GraphQl / Apollo Imports
const { typeDefs, resolvers } = require('./schema/schema');

// Route Auth Check
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/signin');
  } else {
    next();
  };
};

// NextJS 
nextApp.prepare()
  .then(() => {

    // Create Express instance
    const app = express();

    // Helmet for some security related header defaults
    app.use(helmet());

    // Rate Limiter
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 1000
    });
    app.use(limiter);

    // Cookies Session
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    app.use(cookieSession({
      name: 'auth_sess',
      // maxAge: 24 * 60 * 60 * 1000,
      keys: [secretOrKey1, secretOrKey2],
      cookie: {
        secure: true,
        httpOnly: true,
        expires: expiryDate
      }
    }));

    // Parse body to json
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    app.use(bodyParser.json({ limit: '50mb' }));

    // DB Connection
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
    require('./config/passport')(passport);

    // Apollo context object function
    const getScope = async (header) => {
      const gotKey = await Pkey.findOne({ apikey: header })
        .then(key => {
          return key.user;
        });
      return gotKey;
    };

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => ({
        authScope: await getScope(req.headers.authorization)
      }),
      introspection: true,
      playground: true,
      // playground: process.env.NODE_ENV === 'production' ? false : GRAPHQL_PLAYGROUND_CONFIG
    });

    // Apollo middleware
    server.applyMiddleware({ app });

    // Server listen
    app.listen({ port: PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
    });



    /////////// COMMON ROUTES & ROUTE IMPORTS ///////////



    // Landing page Route
    app.get('/', async (req, res) => {
      return nextApp.render(req, res, '/', req.query);
    });

    // Signup, signin, signout page routes
    app.get('/signin', async (req, res) => {
      return nextApp.render(req, res, '/signin', req.query);
    });

    app.get('/signup', async (req, res) => {
      return nextApp.render(req, res, '/signup', req.query);
    });

    app.get('/logout', (req, res) => {
      req.logout();
      setTimeout(() => {
        res.redirect('/');
      }, 1000);
    });

    // External Auth routes eg. U/P, Google, Facebook, Logout, etc
    app.use('/auth', authRoutes);
    // Blog routes
    app.use('/api/posts', blogRoutes);
    // Shop routes
    app.use('/api/products', shopRoutes);

    // Common NextJS page routes
    app.get('/dashboard', authCheck, async (req, res) => {
      return nextApp.render(req, res, '/dashboard', req.query);
    });

    app.get('/blog', authCheck, async (req, res) => {
      return nextApp.render(req, res, '/blog', req.query);
    });

    app.get('/shop', authCheck, async (req, res) => {
      return nextApp.render(req, res, '/shop', req.query);
    });

    app.get('/more', authCheck, async (req, res) => {
      return nextApp.render(req, res, '/more', req.query);
    });

    // Wildcard route
    app.get('*', async (req, res) => {
      return handle(req, res);
    });

    const corsOptions = {
      origin: 'https://artracreative.herokuapp.com/',
      credentials: true // <-- REQUIRED backend setting
    };

    // GraphQl Route
    app.get('/graphql', cors(corsOptions), async () => { });
  });
