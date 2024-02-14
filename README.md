# 4ward

4ward is a nodejs http server which execute shell command when specifics endpoints are called.
It uses nodejs and express.

## Command line arguments

You may specify the config file path using -c or --config flags (by default, the config path is "./config.json").
You may also specify the port where http will be served using -p or --port flags (if not specified, it will check the config file).

## Config sample

```
{
  "port": 1235,
  "endpoints": {
    "/testapi": {
      "method": "get",
      "type": "command",
      "command": "echo lol"
    }
  }
}
```

If field port is not provided, it will use 3000.

Field "endpoints" is mandatory.
I must contains an object, each key is the endpoint and each object describe the endpoint.

Each endpoint may specify a method (get, post, put, remove). If it's not provided, it will use "get".
Each endpoint must specify a type.

### Command endpoint 

Each command endpoint must contain at least a "command" string field, which will be executed when endpoint is called.