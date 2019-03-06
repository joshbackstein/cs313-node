# Multiple Node.js projects in a single Heroku repository

This repository is set up according to [this GitHub issue comment](https://github.com/heroku/heroku-buildpack-nodejs/issues/385#issuecomment-291084067).

## How to use

To change the project directory for Heroku to use, edit `set-project-directory.sh` to look like this:

```bash
#!/bin/sh

# Set NPM_PREFIX_DIR
export NPM_PREFIX_DIR='your-project-directory-here'
```

In addition to this, your project directory's `package.json` file must contain a `start` script. If you run your project using the command `node index.js`, your `package.json` file should look something like this:

```
{
  ... other stuff ...
  "scripts": {
    "start": "node index.js",
    ... other scripts ...
  },
  ... other stuff ...
}
```

## Example

Let's make a new project named `cool-web-app`.

First, we need to create and enter the directory for the project. From the root directory of this repository, run the following commands:

```
$ mkdir cool-web-app
$ cd cool-web-app
```

Next, we need to initialize the project using `npm`. This will prompt you for some information, but you can use the default values if you'd like. It will look something like this:

```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (cool-web-app)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /home/your-username/cs313-node-multiple-project-example/cool-web-app/package.json:

{
  "name": "cool-web-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

Now that we've used `npm` to create a default `package.json` file for us, we'll need to add a `start` script to it:

```json
"start": "node index.js"
```

To do this, add the `start` script to the `scripts` section in your project's `package.json` file like this:

```json
{
  "name": "cool-web-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Finally, you'll need to go back to the root directory of this repository and edit your `set-project-directory.sh` file to look like this:

```bash
#!/bin/sh

# Set NPM_PREFIX_DIR
export NPM_PREFIX_DIR='cool-web-app'
```

That's it! You can now create and edit your project's `index.js` file to start working on your project.
