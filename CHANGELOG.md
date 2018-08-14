# Changelog

## v2.2.5-1 (13/08/2018)

#### enhancement

- Remove lodash from lib [#31](https://github.com/Trust1Team/t1c-lib-js/issues/31)

---

## v2.2.5 (10/08/2018)

#### closed

- Fix gulp version [#29](https://github.com/Trust1Team/t1c-lib-js/issues/29)
- Fix Lodash wrong mappings [#28](https://github.com/Trust1Team/t1c-lib-js/issues/28)

---

## v2.2.4 (07/08/2018)
Issues fixed:

#18
#17 
#16 
---

## v2.2.3 (03/08/2018)
Release notes - Trust1Connector - Version t1c-lib-js_v2.2.3

Story
-----

*   \[[T1C-1303](https://trust1t.atlassian.net/browse/T1C-1303)\] \- Downgrade pkijs for certificate parsing compatibility (issue creating new Certificate)
---

## v2.2.2 (03/08/2018)
Release notes - Trust1Connector - Version t1c-lib-js_v2.2.2

Bug
---

*   \[[T1C-1296](https://trust1t.atlassian.net/browse/T1C-1296)\] \- RMC: invalid JSON when retrieving the agent
---

## v2.2.1 (Release Candidate) (31/07/2018)
Release notes - Trust1Connector - Version t1c-lib-js_v2.2.1-rc

Story
-----

*   \[[T1C-693](https://trust1t.atlassian.net/browse/T1C-693)\] \- T1C-JS callback fails on IE11
*   \[[T1C-1157](https://trust1t.atlassian.net/browse/T1C-1157)\] \- Enable T1C-JS library for multiple DS
*   \[[T1C-1193](https://trust1t.atlassian.net/browse/T1C-1193)\] \- Connector Library - Add namespace parameter to PUT certificate call
*   \[[T1C-1199](https://trust1t.atlassian.net/browse/T1C-1199)\] \- Fix Typings and support webpack import
*   \[[T1C-1266](https://trust1t.atlassian.net/browse/T1C-1266)\] \- Implement PIN try counter
*   \[[T1C-1267](https://trust1t.atlassian.net/browse/T1C-1267)\] \- Implement PIN reset
*   \[[T1C-1268](https://trust1t.atlassian.net/browse/T1C-1268)\] \- Implement PIN change
*   \[[T1C-1269](https://trust1t.atlassian.net/browse/T1C-1269)\] \- Implement PIN reset and change
*   \[[T1C-1270](https://trust1t.atlassian.net/browse/T1C-1270)\] \- Import GCLClient from trust1connector
*   \[[T1C-1271](https://trust1t.atlassian.net/browse/T1C-1271)\] \- PKCS11 type inconsistency

Task
----

*   \[[T1C-1273](https://trust1t.atlassian.net/browse/T1C-1273)\] \- Remove notion managed/unmanaged
---

## v2.2.0 (03/07/2018)
Release notes - Trust1Connector - Version t1c-lib-js_v2.2.0

Bug
---

*   \[[T1C-1211](https://trust1t.atlassian.net/browse/T1C-1211)\] \- win10 IE 11 :: bug when no reader connected, after copy-paste to clipboard for user id -> user mapping modal is shown
*   \[[T1C-1252](https://trust1t.atlassian.net/browse/T1C-1252)\] \- deleteType - entity not filled in -> undefined in Front
*   \[[T1C-1253](https://trust1t.atlassian.net/browse/T1C-1253)\] \- downloadFile - when disable notification user (file content is not anymore in form)
*   \[[T1C-1254](https://trust1t.atlassian.net/browse/T1C-1254)\] \- IE11 - listType error
*   \[[T1C-1255](https://trust1t.atlassian.net/browse/T1C-1255)\] \- Add test cases for iface
---

## v1.2.8 (25/06/2018)
Release notes - Trust1Connector - Version js-v2.1.8
                    
<h2>        Bug
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1206'>T1C-1206</a>] -         Implement paging in RMC
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1207'>T1C-1207</a>] -         Implement the upload use case in RMC
</li>
</ul>
        
<h2>        Story
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-457'>T1C-457</a>] -         Implement support for private plugin specific interfaces
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1144'>T1C-1144</a>] -         Update init to support multilanguage
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1148'>T1C-1148</a>] -         Update the readmycards application for integration demo
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1196'>T1C-1196</a>] -         GCLConfigOptions not available in d.ts file
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1216'>T1C-1216</a>] -         Change retrieval of agents to POST with JSON body
</li>
</ul>
---

##  (11/06/2018)
## Sub-task
* [T1C-1063] - Stop using babel-polyfill
* [T1C-1064] - Conditionally Polyfill missing features
## Bug
* [T1C-1062] - ES6-Promise polyfill causes issues on IE11
* [T1C-1140] - Certificate parsing not working when parameter is an object (working for array and string)
* [T1C-1142] - MAID vulnarability in JS lib using hapijs
* [T1C-1143] - Fix determine container for card in reader - typing incorrect
## Story
* [T1C-1081] - ReadMyCards should not include the API key in the Trust1Connector download e-mail
* [T1C-1088] - Order of the log tabs in RMC admin panel
* [T1C-1162] - Migrate citrix to ng2
* [T1C-1187] - Add check for data Null
* [T1C-1198] - Add pinpad detection support without CCID driver
* [T1C-1201] - Enable admin interface for shared environment
* [T1C-1203] - Implement agent resolve for user Identification in JS lib
## Task
* [T1C-1020] - Remove typings and replace with @types
---

## v1.5.5-1 (23/05/2018)
Release notes - Trust1Connector - Version js-v1.5.5.1

Story
-----

*   \[[T1C-1184](https://trust1t.atlassian.net/browse/T1C-1184)\] \- Validate the new x auth header algorithm
---

## v1.5.5 (23/05/2018)
Release notes - Trust1Connector - Version GCL_v1.5.5

Story
-----

*   \[[T1C-1145](https://trust1t.atlassian.net/browse/T1C-1145)\] \- Integrate implicit consent in existing prod release of card reader
*   \[[T1C-1159](https://trust1t.atlassian.net/browse/T1C-1159)\] \- EID token info
*   \[[T1C-1160](https://trust1t.atlassian.net/browse/T1C-1160)\] \- PEN test fix
*   \[[T1C-1161](https://trust1t.atlassian.net/browse/T1C-1161)\] \- Polyfill fix
*   \[[T1C-1162](https://trust1t.atlassian.net/browse/T1C-1162)\] \- Migrate citrix to ng2
*   \[[T1C-1163](https://trust1t.atlassian.net/browse/T1C-1163)\] \- Integrate implicit consent RMC
*   \[[T1C-1165](https://trust1t.atlassian.net/browse/T1C-1165)\] \- Add BeID token info in JS
---

## Multicert-v1.6.1 (04/05/2018)
Release notes - MultiCert - Version JS-v1.6.1

Bug
---

*   \[[MUL-25](https://trust1t.atlassian.net/browse/MUL-25)\] \- Certificate parsing not working when parameter is an object (working for array and string)
---

##  (30/04/2018)

        Release notes - Trust1Connector - Version js-v2.1.6
                                    
<h2>        Task
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1137'>T1C-1137</a>] -         OCV validation does not work if initialised with a JWT
</li>
</ul>
                                        
---

##  (19/04/2018)

        Release notes - Trust1Connector - Version v2.1.5
                    
<h2>        Bug
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1119'>T1C-1119</a>] -         Agent class should not send relay state when using /get
</li>
</ul>
                                                        
---

##  (19/04/2018)

        Release notes - Trust1Connector - Version js-v2.1.4
                    
<h2>        Bug
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1116'>T1C-1116</a>] -         Missing pinpad &amp; os_dialog parameters from PKCS11 Sign call
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1117'>T1C-1117</a>] -         PKCS11 Certificate ID&#39;s missing from pkcs11 certificate endpoint response
</li>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1118'>T1C-1118</a>] -         Error returned by GCL sometimes overwritten with generic network error by JS-lib
</li>
</ul>
                                                        
---

##  (19/04/2018)

        Release notes - Trust1Connector - Version js-v2.1.3
                            
<h2>        Bug
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1115'>T1C-1115</a>] -         Broader EMV matching misidentifies Safenet Token
</li>
</ul>
                                                
---

##  (18/04/2018)

        Release notes - Trust1Connector - Version js-v2.1.2
                            
<h2>        Story
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1113'>T1C-1113</a>] -         Use more generic matching mechanism for detecting EMV cards
</li>
</ul>
                                                
---

##  (18/04/2018)
Release notes - Trust1Connector - Version js-v2.1.1
                            
<h2>        Story
</h2>
<ul>
<li>[<a href='https://trust1t.atlassian.net/browse/T1C-1110'>T1C-1110</a>] -         Check for older version does not work since v2 is now using separate path
</li>
</ul>
                                                
---

##  (17/04/2018)

## v2.1.0







### Story
* [[T1C-1108](https://trust1t.atlassian.net/browse/T1C-1108)] - Don't send relay-state header for managed installations


## Task
* [[T1C-1096](https://trust1t.atlassian.net/browse/T1C-1096)] - Handle error when TLS version <1.2


---

##  (17/04/2018)
## v0.9.0
### Story

*   [[T1C-269](https://trust1t.atlassian.net/browse/T1C-269)] - Define interface JS lib
*   [[T1C-328](https://trust1t.atlassian.net/browse/T1C-328)] - T1C-JS update registration/activations flows
*   [[T1C-348](https://trust1t.atlassian.net/browse/T1C-348)] - URL rewrite the download link when using proxy in JS-lib
---

##  (17/04/2018)
## v1.0.0
### Task

*   [[T1C-408](https://trust1t.atlassian.net/browse/T1C-408)] - Add support to get the version of the T1C-JS

### Other

*   jQuery dependency was only used for making HTTP requests. Replaced with Axios HTTP library to reduce footprint. Some code incompatibilities may occur.


---

##  (17/04/2018)

## v1.0.2
### Bug

*   [[T1C-503](https://trust1t.atlassian.net/browse/T1C-503)] - Fix issue where activation logic would fail on new installations

---

##  (17/04/2018)

##v1.3.5
### Bug

*   [[CTIE-16](https://trust1t.atlassian.net/browse/CTIE-16)] - Fixed issue where parsing certificates would fail on IE11 and other ECMAScript 5 browsers

---

##  (17/04/2018)
##v1.3.6
### Other

*   Added generic DumpData method to return all relevant card data
---

##  (17/04/2018)
## v1.3.7
###Other

*   Fix issue with callback detection: if an object (such as request options) was passed in a position that can contain a callback, in specific cases we would incorrectly assume it to be a callback function, and attempt to call it.


---

##  (17/04/2018)

## v1.3.8
### Other

*   Fix issue where PIV/CIV container was identified as PIV (uppercase); brought in line with other containers (lowercase)
*   Added some LuxTrust examples with certificate parsing enabled

---

##  (17/04/2018)

## v1.3.9
### Story

*   [[T1C-747](https://trust1t.atlassian.net/browse/T1C-747)] - No longer attempt to sync on initialization for managed installs

### Other
*   Correctly allow the OCV url to be set using config

---

##  (17/04/2018)
## v1.3.10
###Story
*   [[T1C-756](https://trust1t.atlassian.net/browse/T1C-756)] - Add activated endpoint to LuxTrust
---

##  (17/04/2018)
## v1.3.11
###Other
*   Add Portuguese eID container

---

##  (17/04/2018)
## v1.4.0-1
### Bug
* [[T1C-783](https://trust1t.atlassian.net/browse/T1C-783)] - As RMC I want to provide a button to verify the reader is a Belfius branded reader