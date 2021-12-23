---
title:  "September Recap"
date:   2018-10-01 20:59:00
categories: code
---

I feel like a broken record when I complain about how quickly each month flies by, but it reinforces how important it is to have these monthly goals. Without them, I feel like the whole year would slip by before I even realise.

## So did I hit my goals for September?

- Build three web apps with Dojo by the end of September
  - Basic Calculator ✔️
  - Weather App ❌
  - Something else... ❌
- Start improving my knowledge of Esri WAB
  - Build a widget ✔️

## What happened?

Only completed 50%  of my objectives, looks kind of bad on paper. In retrospect, I went down a deep Dojo-toolkit rabbit hole . It turns out there was a lot more to the Dojo-toolkit than I thought! It is a massive library which tries to do so much.

I created a basic calculator app which  required me to understand setting up some basic Dojo boilerplate code. This involved:

- Setting up the Dojo config
- Referencing local modules when using the Dojo CDN

This then led me pondering what a Dojo module actually is. This took me down the following rabbit holes :- 

- AMD Modules and the require() method.
- Dojo Classes
- Dojo Widgets (which are basically just  a Dojo class that extends the BaseWidget Class)
- Widget templating

With all of these concepts vaguely understood, I was able to create  a  simple calculator app in using few different methods. Firstly using Dojo classes and creating a simple calculator library which had rudementry methods like add , substract  , multiply  etc.. .  Secondly, I recreated the whole thing again but encapsulating it all in Dojo widget and extending the BaseWidget  dojo class. This meant I was able to simply load the calculator into a HTML file  declaratively with just  the following lines of HTML like this:

    <script src='Calculator.js'></script>
    
    <div data-dojo-type=Calculator ></div>

Finally I ported the app into a WAB  widget (Esri Web App Builder). This was pretty  straight forward once I understood that all WAB widgets are no different from any other standard dojo widget which extends the BaseWidget class. From there on out, It is just plain JavaScript when writing the logic. This was the major revelation that made everything click in place for me. Totally killed the horrible "I have no idea what is happening" feeling when looking at  WAB widgets codebases.

Though I didn't build three different apps using Dojo, I sure went deep into the inner workings of Dojo-toolkit and feel massively more confident using it in my day-to-day work

## Next Goals

I've been thinking a lot about my longer term goals to level up as a developer. After watching this episode of Fun Fun Functions I realise I really need to distinguish my work and play goals. Though both intertwine in some ways, I need to be clear that some things I'm learning for fun and other things I need to learn for work. Last months goals were very work oriented. This led to quite a bit of demotivation and definitely saw some increased levels of slacking which after watching that same episode of Fun Fun Functions, was probably the over justification effect  kicking in. My extra curriculum coding felt a lot like home work...and actually, it was! Last months goals was all preparation for the next work sprint which is kicking off again shortly after a month long break. This work up front has definitely made me feel more prepared for this upcoming work.

If I can find that balance of coding for fun and coding for work. I should be able to enjoy learning new concepts which will benefit me all round . In my head, my next goals which balance out  work and play coding looks something like this.

    | Fun           | Work          | 
    | ------------- |:------------- |
    | React         | Unit Testing  |
    | Vue           | WAB Builds    | 
    | AR.js         | WAB/Dojo      |
    | Aframe        |               |
    | Mapbox        |               |
    ---------------------------------
    |          JS Modules           | 
    |          Promises             |
    |          Async Await          |
    |          Generators           |
    |          Web Workers          |
    |          Shadow DOM           |                             

A lot of things I want to learn, but too much to cover in a month. Seeing as this month I'm off on holiday for two weeks, the things I really want to master by November is the following : - 

JS Modules , Loaders and Bundling :

- AMD
- Common JS
- ES6 Modules
- RequireJS
- SystemJS
- Webpack
- Browerify

New ECMAScript stuff

- Promises
- Async Await
- Generators
