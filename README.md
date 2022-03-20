# Some basic points
---
1. There is big difference between authorization and authentication.
2. JWTs, local login, session based authentication is all about who the user is.
3. Authorization is like sigin with google, facebook, etc. Its like we don't care about who we are talking to but who has access to what resources.
4. In this tut we will be talking about session and JWTs.



# Chapter 1: Topics and Prerequisites

## What is Passport JS
### 1. Welcome to Express Middlewares!

On each HTTP request, Passport will use a "Strategy" 
to determine whether the requestor has permission to view that resource.

If the user does not have a permission, a 401 Unauthorized Error is thrown.

### 2. Passport Strategies?

Each strategy uess the Passport JS framework as a template.

The Passport Local Strategy utilized Cookies, Express Sessions, and some authentication logic.
### 3. Passport JS in laymen language 

 Passport JS is just a framework, that is a middleware that also allows individual developers to develop other middlewares called strategies that connect in to bigger middleware we called passport js framework. And then all of that is wrapped up into a bundle and can be used easily into our express app.

### 4. Summary of what is Passport JS

In short, passport js is just a middleware and on every http request that a user calls to our express server the passport framework is going to first pickup what strategy we are using here and then it will use that strategy to validate if the user is authenticated or not.
If the user is authenticated then only passport will let that user access the requested resource.