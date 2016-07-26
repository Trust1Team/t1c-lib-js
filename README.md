# Trust1Connector JavaScript Library
[![Build Status Develop](https://travis-ci.com/Trust1Team/t1c-lib-js.svg?branch=develop&token=eUEn2WqVpepdMsSFZWqZ)](https://travis-ci.com/Trust1Team/t1c-lib-js)

The Trust1Connector library (T1C-Lib), is a javascript library to communicate with the Trust1Connector. The library simplify the execution to the connector and works asynchronous.

When the Trust1Connector isn’t installed the library will download the file automatically. This check returns a small object with some information.

## Installation - OSX Only
Make sure you have brew installed on your machine
```bash
$ brew update
$ brew upgrade # if you want this!
$ brew install node
```
When node and npm are installed make sure to restart your terminal to make use of the fresh installed versions.

To use all the dependencies we also need the following commands on the environment path
```bash
$ npm install --global webpack
```

You need to have typings installed for typing generation
```bash
$ npm i -g typings
```

In order to install a typing
```bash
$ typings install {framework} --save
```

For jQuery we need to install from dt source:
```bash
$ typings install dt~jquery --global --save
```

To use all the dependencies we also need the following commands on the environment path
```bash
$ npm install --global tslint
```

Debug is needed as well:
```bash
$ typings install debug --save
```

Use npm install to download the necessary dependencies
```bash
$ npm install
```

Use npm test to run the test suite of the project
```bash
$ npm test
```

To lint the code,
```bash
$ gulp tslint
```

To build the project to the right format,
```bash
$ gulp webpack
```

TODO - compiler options
"declaration": false,
"noImplicitAny": true,

### Usage ###
Error message:
```json
{
    "error": false,
    "installed": false,
    "message": "",
    "manual": ""
}
```
| Key | Value |
|-----------|---------------------------------------------------------------------|
| error | When there was an error to perform the request |
| installed | Indication, whether or not the Trust1Connector is already installed |
| message | Message, can be error or installed message |
| manual | Link for manual download |