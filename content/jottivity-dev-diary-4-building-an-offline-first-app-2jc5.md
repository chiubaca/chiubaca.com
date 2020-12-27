---
title: Jottivity Dev Diary #4 | Building An Offline-First App
test: this is a test
---

I'm slowly starting to build up the front-end for Jottivity. One of the goals is to make it an offline-first application. Making a web app work offline is a key requirement for any progressive web applications and is made possible with the use of service workers in conjunction with the browsers Cache API. 

Wow, that was a whole lot of words which might be confusing for some. Lets define some of these concepts real quick.

**Progressive Web Applications** - Also known as PWAs. This is a really big topic on it's own but in a nutshell they are effectively a web applications with super powers which make them feel more like a native app. To do this, a PWA taps into modern browser technologies make your web app become installable, provide push notifications and make it work offline. For further reading check out this [article](https://flaviocopes.com/progressive-web-apps/#what-is-a-progressive-web-app).

**Service Workers** - Or the Service Worker API is one of these modern browser technologies. Service workers can execute JavaScript in the background on a separate thread and wont interfere with the main thread which is already super busy rendering the UI. Service Workers are a really useful new tool for web developers as they can communicate with other modern browser technologies such as the the Cache API. For further information about Service Workers [read this](https://love2dev.com/blog/what-is-a-service-worker/#:~:text=There%20are%20some%20key%20features%20about%20service%20workers,domain%20they%20are%20registered%20with%20More%20items...%20).

**Cache API** - Like the Service Worker API, the Cache API is another a modern browser technology. The Cache API lets a web developer have full control over what resources should be cached by the browser. You can then control whether your app should use resources from the cache or request it via the network again. For further reading check [this out](https://developer.mozilla.org/en-US/docs/Web/API/Cache#:~:text=Cache%20quota%20usage%20estimates%20are%20available%20via%20the,or%20none%20of%20the%20data%20for%20an%20origin.).

To explain how these technologies come together at a high level, it's possible to programme your Service Worker to intercept all required assets by your web applications (e.g fonts, HTML , CSS and JavaScript). Then store them into the browser cache via the Cache API. So even if the device you're using has no internet connection, your web app can still access all the resources it requires to load rather than throwing a sad browser offline message.

There is a fair amount of complexity to code this all by hand. Fortunately there is an easier way. Enter [Workbox](https://developers.google.com/web/tools/workbox/)! Workbox is a JS library which makes adding offline support for your web apps easier. Under the hood, it's using the technologies  I've talked about in this blog. With Workbox, you can opt into some pre-made caching strategies such as "cache-first" or "network-first". The trade-off is that your lose the finer control over your service worker. That's not necessarily a bad thing though, managing when to use and invalidate your cache can get complex very quick!

In my project I'm using Nuxt.js and they have made creating a PWA even easier. You just need to install `@nuxtjs/pwa` with npm. 

Then install it into the project via the `nuxt.config.js` file like so

```js
export default {
// ...truncated for brevity
  modules: [
    "@nuxtjs/pwa"
  ]
}
```
*nuxt.config.js*

Then with a little bit more config in the same file...

```js
export default {
// ...truncated for brevity
  buildModules: [
    [
      "@nuxtjs/pwa",
      {
        icon: {
          iconSrc: "./assets/images/logo.png"
        },
        manifest: {
          name: "Jottivity",
          short_name: "Jottivity",
          description: "Jot your thoughts and mood"
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: "https://fonts.gstatic.com/.*",
              handler: "cacheFirst",
              method: "GET",
              strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
            }
          ]
        }
      }
    ]
  ],
  modules: [
    "@nuxtjs/pwa"
  ]
}
```
*nuxt.config.js*

Here I'm setting up the config which will generate the [manifest.json](https://developer.mozilla.org/en-US/docs/Web/Manifest) file. I've also specified that I want to use the `cacheFirst` Workbox strategy. And that's it! When I build and serve this app, the app will be PWA ready. It's almost too easy with Nuxt!

What I wanted to highlight were some of the new issues this opens up when you're creating an app offline-first. Here are the challenges I'm starting to think about.

- How will you handle operations that need to write to a remote DB?
- How much of the app do you want to work offline?
- How do you let the user know that there is limited functionality whilst there is no internet connection.
- How will you disable parts of the app which require an internet connection?

These are all UI/UX considerations which have to take into account. I feel like if you didn't design your app to be offline-first  you're going to have a really terrible time trying account for all these scenarios and may be left with some scary refactoring to do.

I don't have the solution to any of these problems yet. But it's something I'm starting to think a lot more about. I Look forward to sharing some of the solutions I come up with.

That's all for now!

🎵  Currently Playing:
{% soundcloud https://soundcloud.com/madeon/miracle %}
