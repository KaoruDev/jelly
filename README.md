Jelly
======

Front end build tool built on top of Gulp.

Features
-------
- Built to support SAP ( Single Page Apps ).
- Able to run along side ANY web server.
- Leverages node's require to modularize applications.
- Outputs two files ( per page ): a css file and a javascript file.
- No HTML required. Uses [univeral templates](https://github.com/wookiehangover/universal-jst) to embed templates into the script file.
- Integration with S3 to host static css / js files.
- Will deploy fonts along side your css.

**Coming Soon**

- Test suite will run before deploying.
- Versioned deploys.
- Ability to deploy to test buckets and test script / styles on production.

###Works on:
- node v0.10.35
- io.js v1.2.0

Installation
---------------
Fork this repo

git clone

Jelly assumes you have gulp and bower installed globally

```
npm install bower gulp -g
```

Install dependencies

```
npm install
```

Link up gulp & bower

```
npm link gulp bower
```

Setup AWS keys
```
echo "{}" >> .aws.json
```

To deploy to S3 open .aws.json and edit

```
{
  "akid": "ACCESS ID",
  "sak": "SECRET ACCESS KEY"
}
```
*Must be valid json*


<a name="getting-started"></a>Getting Started
---------
Say for example we wanted to build a fancy UI for our welcome page. First thing we need to do is to create the point of entry file. I.e. the file that gets loaded first.
```
touch app/scripts/welcome.js
```

Tell Jelly we want to compile `welcome.js` and all of it's dependencies to one file. So open `./jelly-configs.js` and add `welcome.js` to `jsFiles` variable.
```
var jsFiles = [
  'welcome.js'
]
```

**jsFiles** is a list of js files Jelly will compile down to one script file. See [bundles](#bundles) for more details.

Great now type `gulp`. This compiles the scripts and stylesheets and outputs to the `build` directory. As of right now we only have a script and no html to use the script. Let's create a dummy html page so we know our javascript is working. Stop the  `gulp` by pressing: `ctrl + c`. Notice that Jelly has already made the `build` directory for you! Great, let's make that dummy `html` page.

```
touch build/welcome.html
```

Open the new html page and add:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
 <script src="/scripts/welcome.js"></script>
</body>
</html>
```

Now if you restart `gulp` by typing `gulp` on your command line and go to `http://localhost:9000/welcome.html` you'll see an empty html page. Now if you add to your `welcome.js` file:
```
alert('Jelly be working');
```

you'll notice the page will refresh automatically and the alert box will pop up! Now you're running!

Connecting with a dev server
--------------

Let's get the server which is serving up our html page running. Add this script tag to the page

```
<script src="http://localhost:9000/scripts/welcome.js"></script>
```
If you refresh the html page you will see a 404 error in the browser's console. That's because we're not running the Jelly server that serves up our static scripts / style sheets.


<a name="bundles"></a>Bundles
--------




