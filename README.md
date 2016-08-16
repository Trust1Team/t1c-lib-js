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

Webpack is need to build the Javascript library
```bash
$ npm install --global webpack
```

Typings must be installed for typing generation
```bash
$ npm i -g typings
```

For jQuery we need to install from dt source
```bash
$ typings install dt~jquery --global --save
```

Linter:
```bash
$ npm install --global tslint
```

Debug:
```bash
$ typings install debug --save
```

Use npm install to download the necessary dependencies
```bash
$ npm install
```

Use gulp test to run the test suite of the project
```bash
$ gulp test
```

To lint the code,
```bash
$ gulp tslint
```

To build the Javascript library, compressed:
```bash
$ gulp webpack
```

TODO - compiler options
"declaration": false,
"noImplicitAny": true,

Registered bower:
`bower register trust1connector git://github.com/Trust1Team/t1c-lib-js.git`

### Documentation ###
[Gitbook](https://www.gitbook.com/book/t1t/t1c-js-guide/details) 
