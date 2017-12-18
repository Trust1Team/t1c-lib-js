# Trust1Connector JavaScript Library
[![][t1c-logo]][Trust1Connector-url]

The Trust1Connector library (T1C-Lib), is a javascript library to communicate with the Trust1Connector. The library simplify the execution to the connector and works asynchronous.

When the Trust1Connector isn’t installed the library will download the file automatically. This check returns a small object with some information.

## Community
We're present on Gitter in the following room:
[Trust1Connector-gitter]

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
Alternatively, if you want to keep debug statements, run
```bash
$ gulp webpack-debug
```

## Roadmap ##
Setup Typescript compiler options
"declaration": false
"noImplicitAny": true

- Implement new plugins (EMV, Calypso, eID for other countries)

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
# Release Notes

## v1.8.0
### Story
* [[NBB-2](https://trust1t.atlassian.net/browse/NBB-2)] - Implement signing for Safenet tokens
* [[NBB-3](https://trust1t.atlassian.net/browse/NBB-3)] - Retrieve certificates without requiring PIN code
* [[NBB-4](https://trust1t.atlassian.net/browse/NBB-4)] - Investigate possibility of adding token name to output of the /slots endpoint

## v1.7.0
### Story
* [[T1C-886](https://trust1t.atlassian.net/browse/T1C-886)] - RMC-citrix provide an button with non-editable input field for an upload folder
* [[T1C-887](https://trust1t.atlassian.net/browse/T1C-887)] - RMC-citrix provide an button with non-editable input field for a download folder
* [[T1C-888](https://trust1t.atlassian.net/browse/T1C-888)] - RMC-citrix provide a tab (or other) to show the file info from the upload folder
* [[T1C-889](https://trust1t.atlassian.net/browse/T1C-889)] - RMC-citrix provide a tab (or other) to show the file info from the download folder
* [[T1C-896](https://trust1t.atlassian.net/browse/T1C-896)] - RMC-citrix Upload file + show in viewer
* [[T1C-897](https://trust1t.atlassian.net/browse/T1C-897)] - RMC-citrix sign selected file

## v1.5.1-3
### Bug
* [[T1C-884](https://trust1t.atlassian.net/browse/T1C-884)] - T1C-JS should not attempt to sync if no API key is available

## v1.5.1-2
### Story
* [[T1C-862](https://trust1t.atlassian.net/browse/T1C-862)] - Avoid calls to the admin endpoints in a managed context

## v1.5.1
### Story
* [[T1C-838](https://trust1t.atlassian.net/browse/T1C-838)] - Position the consent popup at the right lower corner of the screen

## v1.5.0-2
### Story
* [[T1C-840](https://trust1t.atlassian.net/browse/T1C-840)] - T1C-JS should clean up old/invalid authentication token if an error is returned by GCL


## v1.5.0-1
### Story
* [[T1C-829](https://trust1t.atlassian.net/browse/T1C-829)] - Lodash library leaks from T1C-JS and takes over global '_' binding

## v1.5.0
### Story
* [[T1C-817](https://trust1t.atlassian.net/browse/T1C-817)] - A02-Explicit Consent API request
* [[T1C-819](https://trust1t.atlassian.net/browse/T1C-819)] - A03-02-Listing card-readers-card available etc behind consent file
* [[T1C-825](https://trust1t.atlassian.net/browse/T1C-825)] - Add consent enabled information to v1 endpoint

## v1.4.3
### Story
* [[T1C-812](https://trust1t.atlassian.net/browse/T1C-812)] - Add validation to the X-Authentication-Header token used for the consent

## v1.4.2-2
### Bug
* [[T1C-810](https://trust1t.atlassian.net/browse/T1C-810)] - Fix bug where T1C would fail to activate

## v1.4.2-1
### Bug
* [[T1C-807](https://trust1t.atlassian.net/browse/T1C-807)] - isBelfiusReader behaves inconsistently when used with non-Belfius reader and session has timed out

## v1.4.2
### Bug
* [[T1C-802](https://trust1t.atlassian.net/browse/T1C-802)] - Possible to bypass the consent

## v1.4.1

### Bug
* [[T1C-789](https://trust1t.atlassian.net/browse/T1C-789)] - Belfius STX command --> needs extra byte to indicate length
* [[T1C-790](https://trust1t.atlassian.net/browse/T1C-790)] - Add support to split a STX command in multiple commands
* [[T1C-791](https://trust1t.atlassian.net/browse/T1C-791)] - GetNonce fails after a 6927 response for stx

## v1.4.0-2
### Bug
* Correctly identify a VASCO DIGIPASS 870 on all OS platforms

## v1.4.0-1
### Bug
* [[T1C-783](https://trust1t.atlassian.net/browse/T1C-783)] - As RMC I want to provide a button to verify the reader is a Belfius branded reader

## v1.4.0
### Bug
* [[T1C-765](https://trust1t.atlassian.net/browse/T1C-765)] - Use non-existing session ID for tx -> should return an error
* [[T1C-767](https://trust1t.atlassian.net/browse/T1C-767)] - Consent doesn't mention the correct application URI ('*' instead)
* [[T1C-768](https://trust1t.atlassian.net/browse/T1C-768)] - Test application should clear the username when acting as new user
* [[T1C-769](https://trust1t.atlassian.net/browse/T1C-769)] - Remove Open/Close session in Belfius container
* [[T1C-770](https://trust1t.atlassian.net/browse/T1C-770)] - Close session -> should contain the session ID
* [[T1C-772](https://trust1t.atlassian.net/browse/T1C-772)] - Verify CCID Feature -> verify test case
### Story
* [[T1C-700](https://trust1t.atlassian.net/browse/T1C-700)] - As GCL I want to provide an APDU execution endpoint
* [[T1C-703](https://trust1t.atlassian.net/browse/T1C-703)] - As a Belfius container I need to implement an STX wrapper
* [[T1C-704](https://trust1t.atlassian.net/browse/T1C-704)] - As GCL include a CCID fallback scenario for EMV and eID
* [[T1C-705](https://trust1t.atlassian.net/browse/T1C-705)] - As GCL I want to pre-configure service startup/restart and recovery settings
* [[T1C-707](https://trust1t.atlassian.net/browse/T1C-707)] - Test Report
* [[T1C-709](https://trust1t.atlassian.net/browse/T1C-709)] - As EMV container I want to expose an authentication service
* [[T1C-710](https://trust1t.atlassian.net/browse/T1C-710)] - As EMV container I want to expose digital signature service
* [[T1C-711](https://trust1t.atlassian.net/browse/T1C-711)] - As EMV container I want to retrieve basic data (certificates, card holder, ...)
* [[T1C-712](https://trust1t.atlassian.net/browse/T1C-712)] - As GCL host registration of agents can be done with additional metadata
* [[T1C-716](https://trust1t.atlassian.net/browse/T1C-716)] - As GCL I want to provide consent functionality
* [[T1C-751](https://trust1t.atlassian.net/browse/T1C-751)] - Documentation JS Interface
* [[T1C-778](https://trust1t.atlassian.net/browse/T1C-778)] - As a GCL it should detect a Belfius branded card-reader

## v1.3.11
###Other
*   Add Portuguese eID container

## v1.3.10
###Story
*   [[T1C-756](https://trust1t.atlassian.net/browse/T1C-756)] - Add activated endpoint to LuxTrust

## v1.3.9
### Story

*   [[T1C-747](https://trust1t.atlassian.net/browse/T1C-747)] - No longer attempt to sync on initialization for managed installs

### Other
*   Correctly allow the OCV url to be set using config


## v1.3.8
### Other

*   Fix issue where PIV/CIV container was identified as PIV (uppercase); brought in line with other containers (lowercase)
*   Added some LuxTrust examples with certificate parsing enabled


## v1.3.7
###Other

*   Fix issue with callback detection: if an object (such as request options) was passed in a position that can contain a callback, in specific cases we would incorrectly assume it to be a callback function, and attempt to call it.



##v1.3.6
### Other

*   Added generic DumpData method to return all relevant card data


##v1.3.5
### Bug

*   [[CTIE-16](https://trust1t.atlassian.net/browse/CTIE-16)] - Fixed issue where parsing certificates would fail on IE11 and other ECMAScript 5 browsers



## v1.0.2
### Bug

*   [[T1C-503](https://trust1t.atlassian.net/browse/T1C-503)] - Fix issue where activation logic would fail on new installations


## v1.0.0
### Task

*   [[T1C-408](https://trust1t.atlassian.net/browse/T1C-408)] - Add support to get the version of the T1C-JS

### Other

*   jQuery dependency was only used for making HTTP requests. Replaced with Axios HTTP library to reduce footprint. Some code incompatibilities may occur.


##v0.9.11
### Task

*   [[T1C-475](https://trust1t.atlassian.net/browse/T1C-475)] - Provide OCV integration in T1C-JS


##v0.9.8
### Bug

*   [[T1C-470](https://trust1t.atlassian.net/browse/T1C-470)] - T1C-JS: The download functionality no longer works

## v0.9.7 ###
### Story

*   [[T1C-423](https://trust1t.atlassian.net/browse/T1C-423)] - T1C-DS: Download of GCL artifacts through reverse proxy
*   [[T1C-424](https://trust1t.atlassian.net/browse/T1C-424)] - Add support to download artifacts based on the API-key
*   [[T1C-438](https://trust1t.atlassian.net/browse/T1C-438)] - Proxy URI not well resolved when executed in JS lib

## v0.9.6
### Story

*   [[T1C-431](https://trust1t.atlassian.net/browse/T1C-431)] - Update JS lib to support reverse proxy for google bucket downloads

## v0.9.2
### Bug

*   [[T1C-367](https://trust1t.atlassian.net/browse/T1C-367)] - platform dependency missing in js dist

### Story

*   [[T1C-366](https://trust1t.atlassian.net/browse/T1C-366)] - EMV interface implementation
*   [[T1C-418](https://trust1t.atlassian.net/browse/T1C-418)] - JS lib doesn't work with IE9

## v0.9.0
### Story

*   [[T1C-269](https://trust1t.atlassian.net/browse/T1C-269)] - Define interface JS lib
*   [[T1C-328](https://trust1t.atlassian.net/browse/T1C-328)] - T1C-JS update registration/activations flows
*   [[T1C-348](https://trust1t.atlassian.net/browse/T1C-348)] - URL rewrite the download link when using proxy in JS-lib

### Task

*   [[T1C-274](https://trust1t.atlassian.net/browse/T1C-274)] - Demo Web app + demo app + DS API


[Trust1Team-url]: http://trust1team.com
[Trust1Connector-url]: http://www.trust1connector.com
[Trust1Connector-gitter]: https://gitter.im/Trust1Team/Trust1Connector?utm_source=share-link&utm_medium=link&utm_campaign=share-link
[t1t-logo]: http://imgur.com/lukAaxx.png
[t1c-logo]: http://i.imgur.com/We0DIvj.png
[jwt-up-doc]: https://trust1t.atlassian.net/wiki/pages/viewpage.action?pageId=74547210
