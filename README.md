[![Build Status](https://travis-ci.org/Trust1Team/t1c-lib-js.svg?branch=develop)](https://travis-ci.org/Trust1Team/t1c-lib-js) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0ee9b878274c401da8d25d1ae4680277)](https://www.codacy.com/app/maaso/t1c-lib-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Trust1Team/t1c-lib-js&amp;utm_campaign=Badge_Grade)
# Trust1Connector JavaScript Library
[![][t1c-logo]][Trust1Connector-url]

The Trust1Connector library (T1C-Lib), is a javascript library to communicate with the Trust1Connector. The library simplifies the execution to the connector and works asynchronously.

This is version 2 of the library, and is intended to be used with Trust1Connector v2+.

When the Trust1Connector isn’t installed the library will return an uninitialised client which can be used to download a client installer.

## Backward compatibility
The library will detect the installed version of Trust1Connector and will only function with version 2.0.0 and higher.

If you have version 1.x.x installed you have two options:

  * Upgrade to version 2+ (recommended)
  * Use an older version of the library by running:

```bash
$ npm i trust1connector@1.8.3
```
(currently v1.8.3 is the latest version compatible with T1C v1)

## Community
We're present on Gitter in the following room:
[Trust1Connector-gitter]

## Installation - OSX Only
Make sure you have NodeJS installed on your machine. Use of Yarn is recommended but not required.

#### Webpack
Webpack is needed to build the Javascript library
```bash
$ npm install --global webpack
```

#### Dependencies
Navigate to the root directory and use Yarn to download and the necessary dependencies
```bash
$ yarn
```
##### OR
Use npm install
```bash
$ npm install
```

#### Run tests
Use npm run the test suite of the project
```bash
$ npm run localTest
```

tsconfig.js 
    "types": [ "node", "mocha", "chai", "sinon" ]

#### Linting
To lint the code,
```bash
$ gulp tslint
```

### Build and package
To build the Javascript library, compressed:
```bash
$ gulp webpack
```
Alternatively, if you want to keep debug statements, run
```bash
$ gulp webpack-debug
```

### Publish to NPM
To publish to NPM (public!), run the following NPM command:
```
$ npm publish
```
*Note*: This requires the correct .npmrc to be set. See documentation [here](https://trust1t.atlassian.net/wiki/spaces/NPAPI/pages/631242830/Publishing+to+public+NPM+registry).


## Distribution ##
Registered bower:
`bower register trust1connector git://github.com/Trust1Team/t1c-lib-js.git

## License

```
This file is part of the Trust1Team(R) sarl project.
 Copyright (c) 2014 Trust1Team sarl
 Authors: Trust1Team development

 
This program is free software; you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation with the addition of the
 following permission added to Section 15 as permitted in Section 7(a):
 FOR ANY PART OF THE COVERED WORK IN WHICH THE COPYRIGHT IS OWNED BY Trust1T,
 Trust1T DISCLAIMS THE WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.

 This program is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE.
 See the GNU Affero General Public License for more details.
 You should have received a copy of the GNU Affero General Public License
 along with this program; if not, see http://www.gnu.org/licenses or write to
 the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 Boston, MA, 02110-1301 USA.

 The interactive user interfaces in modified source and object code versions
 of this program must display Appropriate Legal Notices, as required under
 Section 5 of the GNU Affero General Public License.

 
You can be released from the requirements of the Affero General Public License
 by purchasing
 a commercial license. Buying such a license is mandatory if you wish to develop commercial activities involving the Trust1T software without
 disclosing the source code of your own applications.
 Examples of such activities include: offering paid services to customers as an ASP,
 Signing PDFs on the fly in a web application, shipping OCS with a closed
 source product...
Irrespective of your choice of license, the T1T logo as depicted below may not be removed from this file, or from any software or other product or service to which it is applied, without the express prior written permission of Trust1Team sarl. The T1T logo is an EU Registered Trademark (n° 12943131).
```

[Trust1Team-url]: http://trust1team.com
[Trust1Connector-url]: http://www.trust1connector.com
[Trust1Connector-gitter]: https://gitter.im/Trust1Team/Trust1Connector?utm_source=share-link&utm_medium=link&utm_campaign=share-link
[t1t-logo]: http://imgur.com/lukAaxx.png
[t1c-logo]: http://i.imgur.com/We0DIvj.png
[jwt-up-doc]: https://trust1t.atlassian.net/wiki/pages/viewpage.action?pageId=74547210
