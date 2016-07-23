Jelly
======

Build front pages quickly!

Features
-------
- Built to support SAP ( Single Page Apps ).
- Able to run along side ANY web server.
- Leverages node's require to modularize applications.
- Outputs two files ( per page ): a css file and a javascript file.

**Up Next**

- Test suite will run before deploying.
- Integration with S3 to host static css / js files.
- Will deploy fonts along side your css.
- Versioned deploys.
- Ability to deploy to test buckets and test script / styles on production.

###Works on:
- node v5.1.0
- node v6.2.2

Installation
---------------
Add Jelly as a git submodule to your project:

```
git submodule add https://github.com/KaoruDev/jelly.git
```

this will lock in a version of jelly. To update simply run:

```
git submodule foreach git pull origin master
```

**Warning** this will update all of your submodules

then simply run the install script:

```
jelly/install
```

**NOTE**
The default files will only be copied / created if they don't already exist.
Rerunning this command will however rerun `npm install --save-dev`


Now you should have access to `dev` task which spins up a instance of [browserSync](https://www.browsersync.io/) at localhost:3000.


