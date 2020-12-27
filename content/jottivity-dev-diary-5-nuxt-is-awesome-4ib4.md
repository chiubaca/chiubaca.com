---
title: Jottivity Dev Diary #5 | Nuxt.js is Awesome
test: this is a test
---

I'm really enjoying [Nuxt.js](https://nuxtjs.org/) and I just wanted to do a quick post around the some of the modules that both Nuxt and the community has created which come together to produce an amazing developer experience.

## [Nuxt TypeScript](https://typescript.nuxtjs.org/guide/)

It's just same Nuxt but with full TypeScript support out-of-the-box. Everything works exactly same.

## [Nuxt PWA](https://pwa.nuxtjs.org/)

This module makes it really easy to PWA-ify your app to give it new superpowers such as offline support and become installable on the users device.

Under the hood it's using [Workbox](https://developers.google.com/web/tools/workbox/). I'm still experimenting with this module but I'm excited with the fact they provide an escape hatch so you can tinker around with some of the [Workbox lifecycle events](https://pwa.nuxtjs.org/workbox/#hooking-on-service-worker-registration-life-cycle). This might be useful for notifying the app has been updated for example. 

## [Nuxt SVG](https://github.com/nuxt-community/svg-module)

I like to have my SVG inlined in my templates, but I hate how much bloat it adds to my markup. Using this module you can inject SVG as if they are Vue components and because you have to option to load the SVG as if they were inlined, you still have full CSS control over the SVG your single file component.

## [Nuxt Components](https://github.com/nuxt/components)
This removes the need to import your Vue components. Nuxt will just ✨auto-magically✨ know! 

Note, this is not global components. It's similar, but much smarter. At build time, Nuxt scans your components and will load the relevant components into your Vue components if it detects it's being using in the template. 

## [Nuxt Color Mode](https://github.com/nuxt-community/color-mode-module)

This creates a system for you to theme your app. What's neat, is that this module provides an easy way to detect the clients user-preference and also persists the selected theme.

# Noticeable Mentions

## [Nuxt Storybook](https://github.com/nuxt-community/storybook)

I've not had a chance to test this out yet, but keen to do so soon. This promises to make it extremely easy to integrate with Storybook for a really slick way of developing components in isolation.

