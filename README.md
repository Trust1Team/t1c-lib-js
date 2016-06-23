# Trust1Connector JavaScript Library

The Trust1Connector library (T1C-Lib), is a javascript library to communicate with the Trust1Connector. The library simplify the execution to the connector and works asynchronous.

When the Trust1Connector isn’t installed the library will download the file automatically. This check returns a small object with some information.

## Set up ##
```bash
$ git clone
$ npm install
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