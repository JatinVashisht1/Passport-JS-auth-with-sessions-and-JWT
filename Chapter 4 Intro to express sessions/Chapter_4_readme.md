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
## flow of data after implementing express session
### Explaination of express-session options
- secret is usually stored in environment variable and we won't want to expose it to the public
- resave and saveinitialized are the options related to what does the session do if nothing is changed and it tells middleware how to react to different events in the browser 
- maxAge is like the expiration time of cookie in millis

### Basic architecture of express-session
#### Client side changes
- When we will send a http get request to our route, the session middleware will initialize a session.
- Then it will take that session id and set the cookie equal to the session id 
- The cookie is then going to be put in HTTP header as set-cookie parameter or value 
- And then HTTP header will be in response header and the browser will receive the response
- Then browser will see that server wants browser to set cookie and will set the cookie value to that specified
- And now every time we refresh, that cookie will be a part of that request 
#### Server side changes when we will refresh
- The express session will get the cookie on every request and it will look the cookie value/id in the session store(database here).
- And if the session is valid it will use info from the session else redirect it to the route specified.
- Everytime the server will get the cookie with session id attached to it, it will get that session from the database and it will get all the information about that session and it can be used to whatever we have instructed.
- we can also see how many visits the user has made to our server.
```
// To se how many visits user has made
app.get('/', (req, res, next)=>{
    if(req.session.viewCount){
        req.session.viewCount++;
    }else{
        res.session.viewCount = 1
    }
    res.send(`<h1>you have visited this page ${req.session.viewCount} times`)
});
```
- In the above code snippet when we set the `req.session.viewCount` property it persisted in the database or session store
- Now we can get an idea how passport js middleware will connect to express-session middleware to keep its own data