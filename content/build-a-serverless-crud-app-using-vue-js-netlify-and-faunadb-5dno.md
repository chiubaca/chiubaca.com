---
title: Build a serverless CRUD app with authentication using Vue.js Netlify and FaunaDB
test: this is a test
---


Building web apps has never been easier. It's not necessary to build a whole backend system and configure your database from scratch. We are in the age of serverless which means we don't need to think about managing servers anymore. All the hard problems around scaling your app can be offloaded to third party services and there so many great ones to choose from now. This means you have more time to think about the thing that is important, the product you want to build.

# How to start building serverless web apps today?

Well one way is to use some starter code which I've put together here:

- https://github.com/chiubaca/vue-netlify-fauna-starter-kit. 

Follow the steps and you will have spun up your own serverless app in just a few clicks.

...

OK done?

You have now deployed a serverless app which has authentication and a persistent data store ready go. All hosted and managed for free thanks to [Fauna](https://fauna.com/) and [Netlify](https://www.netlify.com/)! And you didn't even need to whip out your credit card.

If you're like me and learn by poking around the source code. The rest of this blog will be a companion guide to explain how this app works and has been put together. Try running the app local on your machine, follow along and don't be afraid to break things.

# App Structure

```
.
├── functions // Netlify serverless functions
├── src/
  ├── components // Vue components
  ├── pages  // Wrapper components to construct the "pages" of the app
  ├── store
    ├── modules/
      ├── auth/ // Vuex store for everything related to user auth
      ├── app/  // Vuex Store for generic app metadata
  ├── helpers   // Helper modules
  ├── models    // Wrapper functions for FuanaDB processes
  ├── router.js // Vue Router settings
  ├── main.js   // App entry point and also where initialisation scripts get called
└── package.json
```

I leaned heavily on the pattern outlined by Divya in this [Netlify blog](https://www.netlify.com/blog/2018/12/07/gotrue-js-bringing-authentication-to-static-sites-with-just-3kb-of-js/) with some amendments. We will be making use of [Vuex](https://vuex.vuejs.org/) and [Vue Router](https://router.vuejs.org/) . If you're following along it is assumed you are familiar with how these libraries work.

# App Initialisation

The deploy to Netlify button makes forking and deploying the app really straight forward, but you might be wondering what is going on behind the scenes.

Firstly, the script  [bootstrap-db.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/scripts/bootstrap-db.js ) is run before the Vue app is built and deployed to Netlify. This script checks the FaunaDB instance for the necessary collections and indexes which is required by the app and creates them if they are missing. It will build the following :

- A collection for the users
- A collection for the journals
- A collection for the posts
- An index for the posts
- An index for the journals

If you want to extend this app to include more collections and create additional indexes, this is where you can do it.

If this all a bit confusing already, you might to spend a bit of time in the Fauna docs to familiarise your self with some of their concepts. Their [CRUD tutorial](https://docs.fauna.com/fauna/current/tutorials/crud) is great.

# Authentication

With the app bootstrapped and ready to go, lets get into the weeds of how authentication works. This app utilises Netlify’s open source [GoTrue JS library](https://github.com/netlify/gotrue-js) There is no user interface that comes shipped with GoTrue-js, so we will go though the steps of how you can assemble these various components into a coherent login and signup experience.

##  Start the GoTrue client 

in `main.js` The first step is to initialise GoTrue. We do this by dispatching a Vuex action.

```js
store.dispatch("auth/initAuth");
```

[*/src/main.js*](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/main.js)

This is a  simplified version of the `"auth/initAuth"` the Vuex action.

```js
const hostName = document.location.hostname; // returns "vue-netlify-fauna.netlify.com"
const APIUrl = `https://${hostName}/.netlify/identity`; // construct the netlify identity endpoint
...
const initNewGoTrue = APIUrl => {
    return new GoTrue({
        APIUrl: APIUrl,
        audience: "",
        setCookie: true
    });
};
...
commit("SET_GOTRUE", initNewGoTrue(APIUrl));
```

[/src/store/modules/auth.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/store/modules/auth.js)

The important part is instantiating the GoTrue client and making a mutation to the Vuex state to store the GoTrue instance. This gives us access to all the GoTrue methods which we can then use throughout  the `auth.js` Vuex module. 

## Signups and Logins

The GoTrue-js library has a straight forward and intuitive API which you read [here](https://github.com/netlify/gotrue-js).

Signups and logins is good way to see it in action. As noted in Divya's Netlify blog, we need to wrap the GoTrue methods in a promise which makes it possible to chain on additional error checks.

```js
    attemptSignup({ state }, credentials) {
      return new Promise((resolve, reject) => {
        state.GoTrueAuth.signup(credentials.email, credentials.password, {
          full_name: credentials.name
        })
          .then(response => resolve(response);
          )
          .catch(error => reject(error));
      });
    },
```

*[/src/store/modules/auth.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/store/modules/auth.js#157)*

Notice how we're using GoTrue with ` state.GoTrueAuth.signup`. This is important otherwise Vuex will throw a warning that we're mutating state outside of Vuex. The whole purpose of a state management library like Vuex is that we're trying to contain the state in one place to make it easier manage. You will see the `attemptLogin` action follows pretty much the exact same pattern.

```js
    attemptLogin({ commit, state }, credentials) {
      return new Promise((resolve, reject) => {
        state.GoTrueAuth.login(credentials.email, credentials.password, true) // the third enable the client store the login token, useful for remember me functionality.
          .then(response => {
            resolve(response);
            commit("SET_CURRENT_USER", response); // This stores the user credentials into state
          })
          .catch(error => reject(error));
      });
    },
```

The key part, is that we pass the successful sign in response to `SET_CURRENT_USER` which mutates the`state.currentUser` object with useful user-metadata including a database access token.

Before we take a deeper look into how the user metadata is created. Let's loop back to what happens after the user has successfully signed up.

## Confirming the user

GoTrue still needs to verify the user via a one time confirmation token. Netlify will  generate this token behind the scenes for you. The user simply has to check a confirmation email they received when they signed up. Within that email, there is a link which will redirect you back to your app.

![image-20200410131109925](https://user-images.githubusercontent.com/18376481/79639178-f6d2dd00-8181-11ea-965d-e1dbcfb783cc.png)

On returning back to the app, you will be prompted that the account has been confirmed! 

![image-20200410131450016](https://user-images.githubusercontent.com/18376481/79639179-f76b7380-8181-11ea-8370-11bf25506bd8.png)

Wait, what? How did that happen?

Take note of the URL at the top. You can see that there is a hash or [fragment identifier](https://en.wikipedia.org/wiki/Fragment_identifier). This is the token which is used to confirm the user.

The magic happens in *[src/main.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/code-tidyup/src/main.js#L16)* . Whenever the app initialises, it always checks for a hash in the URL via `attemptToAuthoriseTokens()` . There are various tokens we need to look out for and parse such password resets and external login tokens, so all of this logic is in *[src/helpers/authorise-token.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/helpers/authorise-tokens.js)*. No matter what the token is, we make use of the `document.location` browser API to access contents of the URL, then extract the bit that we need, like so.

```js
const token = decodeURIComponent(document.location.hash).split("confirmation_token=")[1];

function confirmEmailToken(token) {
  store.dispatch("auth/attemptConfirmation", token)
    .then(resp => alert(`${resp.email} has been confirmed, please login`))
    .catch(error => {
      alert(`Can't authorise your account right now. Please try again`);
      console.error(error, "Somethings gone wrong logging in");
    });
}

```

As you can see, once we have the token we pass this over to the `"auth/attemptConfirmation"` Vuex action.

```js
    attemptConfirmation({ state }, token) {
      console.log("Attempting to verify token", token);
      return new Promise((resolve, reject) => {
        state.GoTrueAuth.confirm(token)
          .then(response => {
            console.log("User has been confirmed");
            resolve(response);
          })
          .catch(error => {
            console.log("An error occurred trying to confirm the user", error);
            reject(error);
          });
      });
    },
```

*[src/store/modules/auth.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/store/modules/auth.js)*

GoTrue-js will do the rest. Once again, a similar pattern to the login and signups actions. 

To wire this up in the front end, here is a simplified version of what the login component looks like

```vue
<template>
  <div class="login-page">
	...
      <form
        @keyup.enter="login()"
      >
        <h2>🔐 Login Here</h2>
        <label for="email">Email</label>
        <input
          v-model="crendentials.email"
          placeholder="hey@email.com"
        />
        <label for="password">Password</label>
        <input
          v-model="crendentials.password"
          placeholder="******"
         />  
		...
      </form>
      <button type="button" @click="login()">Login</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LoginSignup",
  data() {
    return {
      crendentials: {
        name: "",
        password: "",
        email: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", [
      "attemptLogin",
    ]),
    login() {
      this.attemptLogin({ ...this.crendentials })
        .then(() => {
          alert(`You have signed in!`);
        })
        .catch(err => console.error("There was an error:" err));
    },
      ...
};
</script>

```

[*src/components/LoginSignup.vue*](src/components/Login.vue) 

There are still remains an important question. Once we're authenticated via Netlify, how is this connected to Fauna? 

What needs to happen next, is a new user has to be created in the FaunaDB instance once a user account has been successfully signed up on Netlify. Additionally, this user requires a unique access token with read and write permissions to only the resources it has created. The problem is that we can only create a new Fauna user account and access token via our administrator server key which is the same one used to setup the initial collections. We absolutely can not use this key in the frontend, otherwise anyone would have administrative access to our database!

These types of operations are usually done on secure backend servers, but the whole point of serverless is that we don't need to manage backends! So the answer is...

#  Netlify Functions!

Lets talk about really exciting aspect of serverless app architecture. Serverless functions! This is the ability to write any arbitrary backend code which is charged only for its execution time. 

Netlify Functions lets you run your "backend" logic via this service. My favourite thing about them, is it allows for your backend and frontend code to effortless come together in the same repo. All you need to do is have a folder named `functions` in the root directory on your project and then you can write any code which you would normally run in Node.js. The only boiler plate code which we need to use is the following:

```js
exports.handler = function(event, context, callback) {
    // your server-side functionality
}
```

## Connecting your Netlify user to FaunaDB

Netlify Functions can be triggered on demand by hitting an endpoint which Netlify will create for you based on the file name of your function. However, Netlify can also trigger your serverless function on certain events. One of these events is `identity-signup` which is triggered when a new user has signed up. This is the perfect place for us to write our logic to connect our Netlify user to Fauna.  A full list of all the available triggers can be found [here](https://docs.netlify.com/functions/trigger-on-events/#available-triggers). All we need to do is name the file"`identity-signup.js`" in the `./functions` folder and Netlify will know to trigger this code whenever a new sign-up event happens.

Lets break down what happens inside `identity-signup.js`

Firstly we need to import the libraries we need .

```js
const faunadb = require("faunadb");
const generator = require('generate-password');
```

We're using the FaunaDB JS driver, which lets perform administrative database actions with JavaScript. We also want to generate a random passwords for the newly created Fauna user account and for that we can use the [Generate Password](https://www.npmjs.com/package/generate-password) library. 

Next, we set up our function which creates a new Fauna DB user.

```js
/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

function createDbUser(userData, password) {
  	return client.query(
		q.Create(
          	q.Collection("users"), {
    			credentials : {
     			password : password
    	  	},
    	 	data : {
             	id : userData.id,
                user_metadata : userData.user_metadata
    	    }
  		}))
} //resolves a promise with the user object
```

Looks kind of weird right? That's what I thought at first. What you're looking at is the JavaScript version of FQL (Fauna Query Language). FQL is functional in its programming style, which means you will see functions, within another function. You should feel at home if you like using JavaScript array methods like `map` and `reduce`.

Also notice we're using `process.env.FAUNADB_SERVER_SECRET`. When this function is run by Netlify, it has access to any environment variables which have been set in the `Build & Deploy` section of your Netlify site settings. When you first deployed the app and supplied the Fauna server key, this was applying the `FAUNADB_SERVER_SECRET` environment variable for the site. Now we are reusing that key again.

To break down what the `createDbUser()` function is doing;

1. We let the new Fauna client instance `client.query()` method know we want to create a new "thing" by using the `q.Create()` method.  

2. The `q.Create` method  takes two arguments. 

   -  The "thing" we want to create, in this instance , we are inserting some new data in the `users` collection. 

-  The second argument is what is the `param_object` as noted in the [Fuana docs.](https://docs.fauna.com/fauna/current/api/fql/functions/create) This `param_object` can take all sorts of configuration which we wont go into details of. What's important to note, is we will be supplying it a password property in the `credentials` object and a `data` object which is ,you guessed it, the actual data we Fauna to save. In our instance we supply the unique ID which was generated by Netlify along with the Netlify user-metadata.  

Once that FaunaDB user account has been created, we then need a function which creates an access token which can be used to write back to the database. This will secure any read and write operations to that user. To do this we can run the FQL function `q.Login()` . [This will create an authentication token for the provided identity object](https://docs.fauna.com/fauna/current/api/fql/functions/login).

```js
function obtainToken(user, password) {
  console.log("Generating new DB token")
  return client.query(
    q.Login(q.Select("ref", user), { password }))
} // Resolves a promise with the access token in an object
```

*[functions/identity-signup.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/functions/identity-signup.js)*

We are ready to to put these functions altogether in the main `handler` function. The `handler` Netlify function has some useful properties and functions scoped within its context when it is run by Netlify. For example we can extract the Netlify user-metadata by pulling it out of the `event` object like so.

```js
function handler(event, context, callback) {
      const payload = JSON.parse(event.body);
      const userData = payload.user; // Netlify user object 
      const password = generatePassword(); // Returns a randomised string
      ...
}
```

The `event.body` contains the Netlify user-metadata that we need. We need to de-serialise the the payload  using `JSON.parse` as it is a string. Once de-serialised, we can store `userData` which we will use along with a uniquely generated password.

We can use the `createDbUser()` function we created earlier and pass in the `userData` object and `password` like so.

```js
function handler(event, context, callback) {
    const payload = JSON.parse(event.body);
    const userData = payload.user; // Netlify user object 
    const password = generatePassword(); // Returns a randomised string
  	
    createDbUser(userData, password)
}
```

Once the DB user is created, we can chain on the `obtainToken()` function which takes the resolved Fauna user object and also the password for that account which we can reuse. 

```js
function handler(event, context, callback) {
	...
  	createDbUser(userData, password)
    	.then((user) => obtainToken(user, password))
}
```

This will return a DB access token which we can save back to the Netlify user account. 

We do this by using using the `callback` function which the Netlify handler function provides. 

```js
function handler(event, context, callback) {
	...
    createDbUser(userData, password)
        .then((user) => obtainToken(user, password))
        .then((key) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ app_metadata: { db_token : key.secret} })
        })
    })
}

```

The first argument  in the `callback` function is for handling an error response. The second argument is the response object which you can read about [here](https://docs.netlify.com/functions/build-with-javascript/#format). If you want to use serverless functions to create a REST APIs, this is where you can return back some data. 

What is key here, is that this particular serverless function is run by a Netlify event trigger. This means that if you return an object with `"app_metadata"`, Netlify knows to handle this, and it will write this data back to the Netlify Identity user which invoked this trigger. 

Yes that's correct, Netlify user accounts can persist a small amount of data, so this is an ideal place to store the Fauna DB token associated with the account. When we then login via GoTrue, the success response of logging in will return this same user-metadata which can then use in the front-end. 

To try and summarise what has happened;

1. We've registered a new user on the front-end which will invokes `identity-signup.js` via a Netlify event trigger.
2. `identity-signup.js` creates a unique user on Fauna and access token
3. `identity-signup.js` then saves this access back to the Netlify users account.
4. When the user successfully signs into the app, it returns all the useful user-metadata including the DB access token into Vuex so it is readily available for other components in the Vue app.

A good component to see how we can make use of the user-metadata in Vuex for some conditional rendering is the `Home.vue` component. The `Home.vue` component is a wrapper for the landing page of the app, but also renders the `Login.vue` component if there is no logged in user. We can implement this logic by checking the Vuex `currentUser` getter.

```vue
<template>
  <main>
    <h1>Vue - Netlify - Fauna</h1>
    <h2>A serverless stack with authentication ready to go!</h2>
    ...
    <Login v-if="currentUser === null" />
    <div v-else >
      <h2>🖐️ Welcome Back {{ currentUser.user_metadata.full_name }}!</h2>
      ... 
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "../components/Login.vue";
export default {
  name: "Home",
  components: {
    Login
  },
  computed: {
    ...mapGetters("auth", ["currentUser"])
  }
};
</script>
```

I'm conscious I've covered quite a lot regarding authentication. Its important to note, I've only covered the workflow for email signups. Unfortunately the `identity-signup` Netlify trigger does not get triggered by external providers such as Google. This means me we need to a little more heavy lifting to create this same workflow for email signups. If you're curious you can see how it all works in *[./functions/identity-external-signup.js](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/functions/identity-external-signup.js)*.

# Secured Pages

With the signup and login workflow in place, we now have an app which is "aware" of what user is authenticated. We are now ready to create secured pages where an authenticated user can access and see content which only belongs to them. We do this using client side routing via [Vue Router](https://router.vuejs.org/). 

## Setting up the routes

```js
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: () => import("./pages/Home.vue")
  },
  {
    path: "/journals",
    name: "journals",
    component: () => import("./pages/AllJournals.vue"),
    meta: { authRequired: true }
  },
  {
    path: "/journals/:id/posts",
    name: "posts",
    component: () => import("./pages/AllPosts.vue"),
    meta: { authRequired: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./pages/Profile.vue"),
    meta: { authRequired: true }
  },
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router
```

*[src/router.js](src/router.js)*

Notice how the `/home` path is the only router without `meta: { authRequired: true }`. This is because the `/home` path is an unrestricted page and will be publicly available regardless of if you are authenticated or not. 

All the other routes include `meta: { authRequired: true }` as we will use this property along with checking the Vuex store to see if there is a `currentUser`. If so, the user is allowed to proceed to one of these pages. To implement this logic we can do it in the `router.beforeEach` method.

```js
import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
...
router.beforeEach((to, from, next) => {
  // For every route, check if there is `meta.authRequired` property
  const authRequired = to.matched.some(route => route.meta.authRequired);
  // If the route doesnt have a `meta.authRequired` property go on ahead!
  if (!authRequired) {
    return next();
  }
  // If we go this far then it must have the `meta.authRequired`. But is there is a user logged in? If so, then go right on ahead! 
  if (store.getters["auth/loggedIn"]) {
    return next();
  }
  // The page requested is both secured and there is no logged in user detected. Sorry mate. No entry!
  console.warn("Page restricted, you need to login");
  next({ name: "home", query: { redirectFrom: to.fullPath } });
});

export default router
```

We've seen how components can access the Vuex store for conditional rendering, but notice how we can also read the Vuex store in the router file which is super handy!

## Nested Routes

The `posts` route is bit different as it is a nested route. However it still honours the same route guard logic.

```js
  {
    path: "/journals/:id/posts",
    name: "posts",
    component: () => import("./pages/AllPosts.vue"),
    meta: { authRequired: true }
  }
```

But by specifying `:id` this route will dependant on the specific journal ID which will be generated by FaunaDB. We only know what this is at the run time of the app and it is dependant of who is logged in. This leads us nicely to the final part of this blog.

# Reading and Writing to FaunaDB

In the app, a user can have any number of journals and within those journals there can be any number of posts. Once the user has logged in and navigate to the  `/journals` route, this will render the [*AllJournals.vue*](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/pages/AllJournals.vue) component. Here the user can create, read, update and delete any journals. The logic for these database operations are in `./src/models/JournalsModel.js `. Lets explore how each of these database operations works.

## Creating a new journal

```js
export function createJournal(journalData) {
  const me = q.Identity();
  return client
    .query(
      q.Create(q.Collection("journals"), {
        data: {
          ...journalData,
          owner: me
        },
        permissions: {
          read: me,
          write: me
        }
      })
    )
    .then(resp => resp)
    .catch(error => error);
}
```

[*src/models/JournalsModel.js*](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/models/JournalsModel.js)

We've seen how to add data into a collection before, and we're doing the same thing here. The difference is as part of the `param_object` we are also specifying the read and write permission for this document, this where we can supply the Identity object stored in the `me` const.  The `Identity` function returns the Fauna user object which is associated with the current authentication token that is current being used.

## Reading Journals

```js
import { q, client } from "../helpers/init-db";
...
export function getJournals() {
  return client
    .query(
      q.Map(q.Paginate(q.Match(q.Ref("indexes/all_journals"))), ref =>
        q.Get(ref)
      )
    )
    .then(resp => resp);
}
```

In this query, we're making use of the  `all_journals` FaunaDB index. Fauna indexes are required when you don't know the specific refs for a document you're interested in, more info in the [Fauna docs](https://docs.fauna.com/fauna/current/tutorials/indexes/index.html). The other thing you may have noticed is that permissions are applied on a per document level. This means when this query is run, Fauna knows to return the journal documents which belong to the current user.

## Deleting Journals

```js
/**
 * @param {object} journal - Fauna journal ref object 
 */
export function deleteJournal(journal) {
  return client
    .query(
      q.Map(
        q.Paginate(
          q.Match(
            // get all the posts within a given journal ref
            q.Index("posts_by_journal"),
            q.Ref(q.Collection("journals"), journal.ref.value.id)
          )
        ),
        // then delete all of the posts within that given journal ref
        q.Lambda("X", q.Delete(q.Select("ref", q.Get(q.Var("X")))))
      )
    )
    .then(() => {
      // Once all of the posts in that given journals have been removed we delete the journal itself
      return client.query(q.Delete(journal.ref));
    })
    .catch(err => err);
}
```

Remember that a journal can contain any number of posts. This means that every post is associated with the same journal ID, so we need to identify these posts and delete them to. 

To break down what this query is doing;

1. It loops over all posts in the `posts_by_journal`index and returns all the posts with the given journal ID. This is done by combing the `Paginate` and `Match` FQL functions.
2. All the posts that are returned are then deleted. This is performed by the `Lambda` FQL function which is sort of like an inline function which can run any other FQL function.
3. Once all the posts are deleted, we then run the final query which deletes the Journal itself.

## Updating journals

```js
export function updateJournalTitle(journalRefID, newTitle) {
  return client
    .query(
      q.Update(q.Ref(q.Collection("journals"), journalRefID), {
        data: { title: newTitle }
      })
    )
    .then(resp => resp)
    .catch(err => err);
}
```

The FQL `Update` function is quite self explanatory. Provide the reference of the of the document in the specified collection you want to update. Then provide the new value in the `data` property of the `param_object`.

## Using these functions in Vue components

Now we have the core CRUD operations in place, we can we now utilise them in our Vue components.

This is as straight forward as importing them in from ` "/src/models/JournalsModel"`. Then we need to wrap the function in a Vue method which lets us use it in the template block.

```vue
<template>
  <main>
      <h1>📔 Your Journals</h1>
        <form>
          <input
            v-model="journal.title"
            required
            type="text"
            placeholder="Name of new journal"
            @keyup.enter="submit()"
          />
          <input
            name="create journal"
            value="Create Journal"
            type="button"
            @click="submit()"
          />
        </form>
  </main>
</template>

<script>
import {
  createJournal,
  getJournals,
  deleteJournal,
  updateJournalTitle
} from "../models/JournalsModel";
import JournalCard from "../components/JournalCard.vue";
export default {
  components: {
    JournalCard
  },
  data: function() {
    return {
      journal: {
        title: ""
      },
      allJournals: []
    };
  }
  methods: {
    submit() {
      createJournal(this.journal)
        .then(resp => {
          alert("New journal created");
          this.allJournals.push(resp);
        })
        .catch(err => console.error(err));
    },
    ...     
   }
   ...
};
</script>
```

*[src/pages/AllJournals.vue](https://github.com/chiubaca/vue-netlify-fauna-starter-kit/blob/master/src/pages/AllJournals.vue)*

This example show we're using the `createJournal` function by wrapping it in the the Vue `submit` method. This lets us pass the name of the new Journal via a reactive Vue data property.`AllPosts.vue` and `PostsModel.js` follow the exact same pattern, check them out.

# Wrap up

This blog could on much longer! But for brevity, I've covered the important parts of how everything works. I cobbled this together by learning how each of these components worked individually, but I wished that there was something that explained how they all fitted together. If you have made it this far, I hope you found it useful! 

# Related links

- https://github.com/shortdiv/gotruejs-in-vue
- https://github.com/fauna/netlify-faunadb-todomvc
- https://github.com/netlify/netlify-faunadb-example

