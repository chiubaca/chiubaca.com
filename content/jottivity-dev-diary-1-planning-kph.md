---
title: Jottivity Dev Diary #1 | Planning 
test: this is a test
---

---
title: Jottivity Dev Diary #1 | Planning 
published: true
description: A series of blogs documenting my journey building my web app
tags: webdev, product, planning, journal
series: [Dev Diary]
---

It's so easy to dive head first into coding. 

You feel so productive when you get something working and on the screen. But this is a trap! If carry building like this you're sure to end up in spaghetti-code town. Even though it sounds incredibly delicious, trust me, this is a bad place to be!

This is precisely what happen with my first attempt at building Jottivity. It felt great to bring an idea I had in my head come to life. However, I hacked it together so quickly there were many aspects of the codebase I was just not satisfied with. Some quick examples:

- Too much data modelling logic in the front-end code
- Authentication state was hard to manage.
- Vue components were not thought through properly
- I was using Firebase "wrong"

I'll address what I mean with each of these points in another post to keep this post short. For now, I want to share a high level plan of how I'm going to build my app this time round.

![Jottivity architecture sketch](https://dev-to-uploads.s3.amazonaws.com/i/zz15zlipl43vs3obvg9m.png)

_Key Points_

1) Firebase, or more specifically Firestore is my database of choice. I'm also relying on Firebase authentication so the tight coupling will make my life easier.

2) Netlify all the things. This web app is going to take the JAMstack approach. I'm going to rely heavily on serverless functions for building my APIs which will be central to the whole app. This architecture should in theory let me swap out my frontend framework if I ever wanted to.

3) My POC was built using Vue CLI, but after playing around with Nuxt, I think a more opinionated structure should help keep me focused. 

With this rough plan in place, I already feel more optimistic I'm going to get it right this time round. Time for some fun, setting up my dev environment! Will share more details about this in my next update.

🎵  Currently Playing:
{% spotify spotify:track:1C5utO1I8FoSIn6g1R5DAZ %}

