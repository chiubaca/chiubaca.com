---
title:  "⚡ Tutorial : Twitter Emoji Weather Forecast "
date: 2017-01-31 16:35:00
categories: tutorial
---

This is a lightning tutorial to explain how to make your Twitter username give a weather forecast using Tweepy , PyOWM and PythonAnywhere.

It's a fun little hack which doesn't take much time to set up at all. 

**If you want to follow along , you'll need to :** 

- Have [pip](https://pip.pypa.io/en/stable/installing/) installed .
- Have basic Python knowledge.


**Time Required:**

30 minutes

# Set Up TweePy

TweePy is an easy-to-use Python library for accessing the Twitter API. 

To install:

```python
pip install tweepy
```

Here is the code you will need to establish a connection to your twitter account:

```python
import tweepy

#login
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

#connect through a secure connection
auth.secure = True
api = tweepy.API(auth)
```
To get your keys, sign in to [apps.twitter.com](https://apps.twitter.com/) with your Twitter account.

Here you can set up a new app then fill in the form to register your app like so.

![img](http://i1381.photobucket.com/albums/ah228/chiubaca/Jekyll%20Blog/register_zpsq2s5odax.png)

Once you're signed up you can find your API keys in the "Keys and Access Tokens" tab. Make sure you parse the the keys in as a `"string"` in the code above.

## Updating Your Profile Using TweePy

Now we have established a connection to our Twitter account we can interact with our whole account through TweePy as if you were actually on Twitter. Because we have the power of Python too, it's possible to script some pretty interesting things like setting a up bot to automate sending a DM to a new follower. It's also possible to write a script to listen and wait for a new post with a specific hashtag, then perform an action. If you want to learn more about everything TweePy can do check out the [docs]() .

For this tutorial we just want to update our profile. You can do so with this single line of code:

```python
api.update_profile( "your-username" + "your-website","location", "description")
```
Thats it. It's almost too easy!

# PyOWM

Next, PyOWM.

PyOWM is a client Python wrapper library for the Open Weather Map (OWM) web API.

To install, simply:

```
pip install PyOWM
```

To establish a connection to the OWM API , the code you need is :

```python
import pyowm

owm = OWM(API_key)
```

Like the Twitter API you will also have to obtain an API key by signing up at the Open Weather Map [site](https://home.openweathermap.org/users/sign_up) .

 You can find your OWM API keys in the "API keys" tab.

![img](http://i1381.photobucket.com/albums/ah228/chiubaca/Jekyll%20Blog/register2_zpstlup98ao.jpg)

## Check The Weather With PyOWM

Now we can start having fun the with the OWM API. 

First, set up the following boilerplate code:

```python
obs = owm.weather_at_place('London,uk')
w = obs.get_weather()
```

Here we have set the OWM API to only return results from London . Refer to the [city list]( http://openweathermap.org/help/city_list.txt) if you want to modify this. 

 `w` is assigned to `obs.get_weather()`  so that we can easily call PyOWM methods related to weather like this.

```python
w.get_wind()                  # {'speed': 4.6, 'deg': 330}
w.get_humidity()              # 87
w.get_temperature('celsius')  # {'temp_max': 10.5, 'temp': 9.7, 'temp_min': 9.0}
```
What we want is the general weather status , which you can call like this:

```python
w.get_status() # returns'Clouds'
```

# Emojify 

We have now established how to update our Twitter username and also how to call a basic weather forecast with PyOWM. 

Time for the fun bit, lets mash the two APIs together with emojis 😁.

Here is some code that calls the weather via PyOWM and then uses Tweepy to update our Twitter username with an Emoji that corresponds with the weather. 

```python
# Weather Emoji Unicode
Clouds = u'\U00002601' #returns ☁️️  
Clear = u'\U00002600' #returns ☀️️
Rain =  u'\U00002614' #returns ☔
Extreme =  u'\U0001F300' #returns 🌀
Snow = u'\U00002744' #returns ❄️️
Thunderstorm = u'\U000026A1' #returns ⚡
Mist = u'\U0001F32B' #returns ⛅
Haze = u'\U0001F324' #returns 🌫️
notsure = u'\U0001F648' #returns 🙈

if weather == "Clouds":
api.update_profile("Alex Chiu "+ Clouds,"chiubaca.github.io","London","Hey'Im Alex!")

elif weather == "Clear":
    api.update_profile("Alex Chiu "+ Clear,"chiubaca.github.io","Hey'Im Alex!")

elif weather == "Rain":
    api.update_profile("Alex Chiu "+ Rain,"chiubaca.github.io","Hey'Im Alex!")

elif weather == "Extreme":
    api.update_profile("Alex Chiu "+ Extreme,"chiubaca.github.io","Hey'Im Alex!")

elif weather == "Snow":
    api.update_profile("Alex Chiu "+ Snow,"chiubaca.github.io","London","Hey'Im Alex!")

elif weather == "Thunderstorm":
    api.update_profile("Alex Chiu "+ Thunderstorm,"chiubaca.github.io","London", "Hey'Im Alex!")

elif weather == "Haze":
    api.update_profile("Alex Chiu "+ Haze,"chiubaca.github.io","London",bio + counter+"/100")

elif weather == "Mist":
    api.update_profile("Alex Chiu "+ Mist,"chiubaca.github.io","London","Hey'Im Alex!")
    
else:
    api.update_profile("Alex Chiu "+ notsure,"chiubaca.github.io","London",bio + counter+"/100")
```

Not the most elegant bit of code - If there are any suggestions to improve please drop a comment below. Nonetheless, I think it's pretty self explanatory. To break it down quickly, first we map some weather emoji unicode to some easier to understand variables. Next is just a rudimentary `if: elif: else:` crawl to go through all the possible weather outputs then it updates the username argument concatenated with an emoji that matches the weather. The `else:` finishes on the monkey emoji just as precaution (kind of like a 404). Also the monkey emoji is my favourite so  wanted to sqeeze it somehow 🙈.

# Host On PythonAnywhere 

So we've written all this code but we still need a way to schedule this to run at least once a day.

Enter [PythonAnywhere](https://www.pythonanywhere.com). A cloud service writing, hosting and running Python code. The beginner tier gives you access to two virtual Python consoles and lets you run a single python script on a scheduled task for free. I love free stuff.

Once you're signed up, go to your files section . You can either upload a python script you have already written or create a new python file and paste the code in. 

Your final code should look something like this .

```python
#!/usr/bin/python2.7
import tweepy
from pyowm import OWM

#Twitter API Keys
consumer_key = "twitter-consumer-key"
consumer_secret = "twitter-consumer-secret-key"
access_token = "twitter-access-token"
access_token_secret = "twitter-access-token-secret"

#Twitter Authentication
auth = tweepy.OAuthHandler(owmconsumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

#Open Weather Map API 
API_key = 'owm-api-key'
owm = OWM(API_key)

#quick variables to check weather in London
obs = owm.weather_at_place('London,uk')
w = obs.get_weather()
weather = w.get_status()

# Weather Emoji
Clouds = u'\U00002601'
Clear = u'\U00002600'
Rain =  u'\U00002614'
Extreme =  u'\U0001F300'
Snow = u'\U00002744'
Thunderstorm = u'\U000026A1'
Mist = u'\U0001F32B'
Haze = u'\U0001F324'
notsure = u'\U0001F648'

#Check Weather and return relevant Emoji
if weather == "Clouds":
    api.update_profile("Alex Chiu "+ Clouds,"chiubaca.github.io","London",bio + counter +"/100")
elif weather == "Clear":
    api.update_profile("Alex Chiu "+ Clear,"chiubaca.github.io","London",bio + counter+"/100")
elif weather == "Rain":
    api.update_profile("Alex Chiu "+ Rain,"chiubaca.github.io","London",bio + counter+"/100")
elif weather == "Extreme":
    api.update_profile("Alex Chiu "+ Extreme,"chiubaca.github.io","London",bio + counter+"/100")
elif weather == "Snow":
    api.update_profile("Alex Chiu "+ Snow,"chiubaca.github.io","London",bio + counter+"/100")
elif weather == "Thunderstorm":
    api.update_profile("Alex Chiu "+ Thunderstorm,"chiubaca.github.io","London",bio + counter+"/100")
elif weather == "Haze":
    api.update_profile("Alex Chiu "+ Haze,"chiubaca.github.io","London",bio + counter+"/100")
elif weather == "Mist":
    api.update_profile("Alex Chiu "+ Mist,"chiubaca.github.io","London",bio + counter+"/100")
else:
    api.update_profile("Alex Chiu "+ notsure,"chiubaca.github.io","London",bio + counter+"/100")

print Clear+Rain+Extreme+Clouds+Snow+Thunderstorm+Haze+Mist+notsure
print("updated!")
```

<iframe src="https://ghbtns.com/github-btn.html?user=chiubaca&repo=Twitter-Emoji-Weather-Forecast&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="158px" height="30px"></iframe>

**Side note** : to install new modules in PythonAnywhere refer to [this](https://help.pythonanywhere.com/pages/InstallingNewModules/) . 

## Set A Scheduled Task In PythonAnywhere

The only thing remaining now is to set the python script as a scheduled task. You can do this in the "Schedule" section in PythonAnywhere. Simply reference your script in your virtual directory like this.

![img](http://i1381.photobucket.com/albums/ah228/chiubaca/Jekyll%20Blog/pythonanywhere_zps3aswhgm7.jpg)



That's it! This script will now run everyday at 7:30AM . When I check my Twitter in the morning I can tell what the weather will be like just from my username like so .

<blockquote class="twitter-tweet" data-lang="en" style="position:center"><p lang="en" dir="ltr">Automated the <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash">#100DaysOfCode</a> counter in my bio. Oh, and my twitter username shows Londons weather in emoji now. All powered by Tweepy! 😁</p>— Alex Chiu ☔ (@chiubaca) <a href="https://twitter.com/chiubaca/status/819581877048721408">January 12, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>



# Resources Referenced

[TweePy](http://www.tweepy.org/),
[PyOWM](https://github.com/csparpa/pyowm),
[PythonAnywhere](https://www.pythonanywhere.com),
