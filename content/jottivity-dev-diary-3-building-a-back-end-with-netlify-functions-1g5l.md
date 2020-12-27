---
title: Jottivity Dev Diary #3 | Building a back-end with Netlify Functions
test: this is a test
---

Work has been getting in the way of this side project lately, but I've been chipping away at this whenever I've had the chance. The last couple of weeks has all been about building the back-end API's with Netlify functions. I hit really nasty bug where my Netlify function was timing out after 10 seconds, but only when it was published to Netlify. Even more infuriating to see it via my my logs, data was being retrieved successfully, but still timing out!

So after asking the [Netlify Forums](https://community.netlify.com/t/netlify-function-timeout-after-10-seconds-when-published/18220/3).

Then chatting to a friendly guy on the Firebase Slack.

Then raising a new issue on the Firebase [GitHub repo](https://github.com/firebase/firebase-admin-node/issues/929).

I finally got to the bottom of the issue! It turned out I had to call an obscure firebase method to "cleanly end" the connection with Firebase so that the Netlify function would not timeout. Bugs are not fun! 😅

I've also been trying to come up with a clean pattern for writing CRUD operations to Firebase.  In theory you could have separate function/endpoint for each type of operation . Take for example a feature I'm working on which lets the user manage their journals. I initially thought should expose a series of API endpoints like this: 

`https://localhost:8888/.netlify/functions/createJournal`

`https://localhost:8888/.netlify/functions/getJournals`

`https://localhost:8888/.netlify/functions/updateJournal`

`https://localhost:8888/.netlify/functions/deleteJournals`

What felt cleaner was to simply just have a single endpoint like so: 

`https://localhost:8888/.netlify/functions/journals`

Then handle all the different HTTP events in a single serverless function like so:

```tsx
/**
 * Main entry point for journal endpoint.
 */
import createJournal from "./createJournal";
import retrieveJournal from "./retrieveJournal";
import updateJournal from "./updateJournal";
import deleteJournal from "./deleteJournal";

export const handler = async function( event, _context, callback) {
  try {
    if (event.httpMethod === "GET") {
      await retrieveJournal(event, callback);
      return;
    }
    if (event.httpMethod === "POST") {
      await createJournal(event, _context, callback);
      return;
    }
    if (event.httpMethod === "DELETE") {
      await deleteJournal(event, callback);
      return;
    }
    if (event.httpMethod === "PATCH") {
      await updateJournal(event, callback);
      return;
    } else {
      callback(null, {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "not supported" })
      });
    }
  } catch (error) {
    console.error("There was an error", error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
```

The only experience I have so far of creating an API is from Free Code Camps "APIs and Micro-services" certification. So trying to figure this all out been a good learning experience for me.  I've usually considered my self as more of a front-end developer but working on this has given me a confident boost in back-end land!

The next update will hopefully be about working on some front-end Vue.js code. 💚
