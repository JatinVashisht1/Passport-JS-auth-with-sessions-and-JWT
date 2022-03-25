# Intro to Express Sessions
- When we use passport local strategy it uses express session under the hood
- **What is difference between session and cookie?**
    - Session and cookie are different in the place their data is stored
    - `Cookie`
        - It have its data stored in browser
        - The browser is going to attach that cookie to every http request that it does
    - `Session`
        - Session is stored on the server side
        - Session can store bigger type of data than cookie
        - We cannot store user credentials sor secret info in cookies as they can be easily intercepted and can lead to data breach.
### [Session store implementation](https://www.npmjs.com/package/express-session)
- In actual production environment we should be having an actual database storing the info. of sessions
- By using express-session uses its own session but it is not using database under the hood, instead using memory that is local to your application known as in-memory database
- We have to setup an actual **session store**, which means we need to connect our database to our express session middleware.
- There are many different session stores we can use.
- We will need **connect mongo** session store in most of the cases.

## Dependencies of express session
- **Express** for routing
- **MongoDB** and **mongoose** for database management
- **Express Session** 
- [learn more about express sessions](https://www.npmjs.com/package/express-session)

## How to use session store and mongodb
- firstly we need to tell express-session middleware that we want to use our mongodb database for its session store
- **To use express-session**
```
    const dbString = 'mongodb://localhost:27017/tutorial_db';
    const dbOptions = {
        useNewUrlParse: true,
        useUnifiedTopology: true
    }

    const connection = mongoose.createConnection(dbString, dbOptions)
    const sessionStore = new MongoStore({
        mongooseConnection: connection,
        collection: 'sessions'// we will put our collection name here
    })

    app.use(session({
    secret: 'some secret,
    resave: false,
    saveUnitialized: true,
    store: sessionStore,
    cookies{
        maxAge: 1000*60*60*24 // Equals to 1 day
    }
}));

```