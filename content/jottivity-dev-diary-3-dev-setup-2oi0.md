---
title: Jottivity Dev Diary #2 | Dev Setup
test: this is a test
---

It's been a bit of struggle, but I think I have found development setup that works for this project.  When I created the initial MVP I used scaffolded out using just a regular Vue CLI project, then setup routing and my dependencies all from scratch. Jumping straight into Nuxt project felt like it should be simple, however I also decided utilise Typescript too  went with the TS-Nuxt variant... this was much bigger mental hurdle than I anticipated.  Let's go through some of challenges I've faced so far.

# Routing

Nuxt has two modes, "universal" and "SPA". Universal mode means that pages are server side rendered which is a bit of mind-f**k when when you have never worked on app designed like that before.  When you're in universal mode , my usual method of setting up navigation guards  with 
```
router.beforeEach((to, from, next) => {// ...})
``` 
 just simply didn't work.  I eventually worked out that I need to implement navigation guards the "Nuxt" way and make use of [middleware](https://nuxtjs.org/examples/middleware/). 

```js
import { Middleware } from "@nuxt/types";

const auth: Middleware = (context) => {
 if(){ // check for something before the page loads 
 // route to somewhere if condition is true  
};

export default auth;
```

I also decided to switch my project to "SPA" mode shortly after figuring this out too. Since I'm building this in a JAMstack way, I'm making full use of (pre-rendered) static generated pages via the Nuxt `generate` command, then I will be rendering content dynamically via serverless API calls. No "traditional" back-end required. 

# State Management

I knew I should fully make use of Typescript super powers in my Vuex store for state managemen, however I had no idea what the pattern for this looked like. TS-Nuxt does let you write your Vuex logic in the "vanilla" way and they include all the necessary type declarations. But I quickly noticed something when looking at Vuex code written in Typescript...

```js
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  things: [] as string[],
  name: 'Me',
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  name: state => state.name,
}

export const mutations: MutationTree<RootState> = {
  CHANGE_NAME: (state, newName: string) => (state.name = newName),
}

export const actions: ActionTree<RootState, RootState> = {
  fetchThings({ commit }) {
    const things = this.$axios.$get('/things')
    console.log(things)
    commit('CHANGE_NAME', 'New name')
  },
}
```

...my eye's were getting knotted trying to parse and understand the generics which are scattered around. Perhaps it's my lack of experience using Typescript, but I just felt this looked "ugly". Also I don't think I could be productive for quite some time with this style of code. 

Thankfully, what appears to be the recommended way of writing Vuex logic in TS-Nuxt is using class based syntax thanks to the wonderful work of [vuex-module-decorators](https://github.com/championswimmer/vuex-module-decorators) . 

My thoughts when reading this documentation for the first time:

> class based?!

> decorators!?"

> This is new and scary and it makes me uncomfortable.

However, one look at the syntax and I was sold:

```js
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'mymodule',
  stateFactory: true,
  namespaced: true,
})
class MyModule extends VuexModule {
  wheels = 2

  @Mutation
  incrWheels(extra) {
    this.wheels += extra
  }

  get axles() {
    return this.wheels / 2
  }
}
```

So clean!

# Serverless Functions

Serverless functions are so cool, I love the fact we can now write "back-end" logic without ever having to provision a node server. What's more using [Netlify Dev](https://www.netlify.com/products/dev/), you can run and troubleshoot your serverless functions locally on your machine. There's more though, Netlify Dev will server your front-end code at the same time for you too, and because it so awesome, it proxies the locally running serverless functions API endpoints *and* the your locally running Nuxt app to the same port. This is great because you can seamlessly access Nuxt pages and API endpoints which makes it replicate the same feel as if it was hosted live in Netlify.  

I love this workflow, It means I can setup up a tidy little `api` helper in my Nuxt project like so:

 

```js
import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
  // only throw error if status code is 500 or above
  $axios.defaults.validateStatus = (status: number) => status <= 500;

  if (process.env.NODE_ENV === "development") {
    $axios.setBaseURL(process.env.DEV_API_BASE_URL as string);
    return;
  }
  if (process.env.NODE_ENV === "production") {
    $axios.setBaseURL(
      "https://" + document.location.hostname + "/.netlify/functions/"
    );
  }
}

export { $axios };
```

I set up my base-URLs once, and I don't ever need to think them again. 

## Typescript and Netlify Functions

Setting up my serverless Netlify functions took a little bit of tinkering, I toyed around with having a separate `package.json` in my `./functions` directory, but this caused issues when deploying to Netlify. In the end, all dependencies are in my root `package.json`  ****which means I only need to worry about dependancies in one place.  What's important is that I have seperate `tsconfig.json` in the `./functions`  directory, This lets me control, where where the compiled TS are exported to. I originally wanted the built files to go into a folder called `./function/built` , but I couldn't get this work so I've settled with the current output which goes into `./function/built/functions` , a little bit repetitive but as long as you have configured your netlify.toml file to look at this directory for your functions it will work all the same.

# Unit Testing

I configured TS-Nuxt to use TS-Jest as my test runner. As it is available globally in the project, It's used for unit testing vue component and serverless functions.

For unit testing serverless functions I'm relying on an additional helper library called [lambda-tester](https://github.com/vandium-io/lambda-tester#readme). I hit an issue where I was getting a TS compilation error when I had installed the type declarations for it. I still have not figured out out to resolve it so I raised an issue on the Github repo and ended up using the library without the declaration files... seems bad I know. For the Vue components, vue test- utils is ready out the box, so no extra work required there

# Tying this altogether.

So that's my dev setup so far. I simply run `npm run ndev` which will compile and watch my Netlify functions, serve Nuxt on one port and my serverless API endpoints on separate port, then neatly proxy everything to `localhost:8888` . I'm pretty happy with this setup so far!

🎵 Currently Playing:
{% soundcloud https://soundcloud.com/soundremedy/wearethedream %}
