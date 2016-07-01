# Trust1Connector JavaScript Library
[![Build Status](https://travis-ci.com/Trust1Team/t1c-lib-js.svg?token=Gnzr2xhdJbZMGJQ8i5nK&branch=develop)](https://travis-ci.com/Trust1Team/t1c-lib-js)

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

Use npm install to download the necessary dependencies
```bash
$ npm install
```

Use npm test to run the test suite of the project
```bash
$ npm test
```

To build the project to the right format,
```bash
$ npm run build
```

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