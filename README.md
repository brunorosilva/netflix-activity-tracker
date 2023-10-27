# Streaming Activity Tracker

Silly little project I made for extracting the progress during a netflix session using a chrome extension with manifest v3.

## Why?
The idea for this project came from years of using series tracking websites, and how it's a pain to constantly sync these websites with my consumption in real time. TBH, this project does not solve this issue just yet, but maybe in the future I might continue working on it. Also, I've always wanted to create chrome extensions just to learn it.

## Structure
- `manifest.json` -> config file that points to popup.html, background.js and content.js and uses string matching to run scripts when the url meets the criteria.
- `content.js` -> gets called when an url meets the criteria, basically adds an event listener for the video tag within a session. The listener only reacts to play or pause commands.
- `background.js` -> gets called once, on init to create an event listener for and waits for the content.js to send a message for it to store the data as json on storage.
- `popup.html` -> basic html for generating the empty table and styling.
- `popup.js` -> script that adds new rows to the table in `popup.html` using the data from storage.

### Improvements/changes that won't be made
This is only a simple project for my personal use and I'm not responsible for how you use it. This is why improvements won't be made, unless someone asks for it.
<b>on `content.js`</b>
- if this was a real life project I'd check for other events and for tab close in order to get all the ways a user could stop a watch session.
- Netflix constantly changes up their video structure and uses object mutation in order to make it harder for scrapers and extensions, this is not being watched for.
- I'm listening for play and pause events, but there's no need to listen to play events, but I used it to debug so this is why I'm listening to it.
- I'm naively using `setTimeout(func, 4000)` which means I'm waiting for 4 seconds before looking for the video tags, this happens because Netflix uses object mutation to create their video tag. If this was a real life project I'd use an async function to wait for the video to show up.

<b>on `background.js`</b>
- As I said, I'm a beginner, so I'm not really sure on what events I really should be listening. I used the `onMessage` and it worked how it should, but I'm not sure if it's the best for this application.
- Sometimes the background script just doesn't work, this mostly happens when the video has been running for some time. I'm not sure what's causing it, but I could look it up and improve upon it.

<b>on `popup.js`</b>
There's so much done in a hurry here that I'm not even sure where to start.
- Use react or vue for a better look.
- Table creation should be done here, because I could make it prettier and give it a default value for when it's empty.
- I'm showing the timestamp as an unix timestamp, I should either store it as a UTC datetime or just display it when I'm filling the table up.

<b>Features</b>
- Create an external file with a compiled view for all series.
- Create a view with the compiled view for all series.
- This doesn't have to be a Netflix Tracker, it could suport Amazon Prime, Hulu, Globoplay and any other streaming service.
- Directly fill series tracking websites with the information that was gathered.

## Issues
If you have any questions or comments on if you'd use this, feel free to open an issue or just chat with my via LinkedIn (add a message saying this is why you're adding me). I'm rarely on Twitter, so I wouldn't risk it.
