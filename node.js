[
    {
        "id": "1c9bcaf3.2cdef5",
        "type": "tab",
        "label": "Door 1",
        "disabled": false,
        "info": ""
    },
    {
        "id": "1aaab864.3e8ac8",
        "type": "websocket in",
        "z": "1c9bcaf3.2cdef5",
        "name": "Camera Events",
        "server": "",
        "client": "71b8855c.22a67c",
        "x": 100,
        "y": 140,
        "wires": [
            [
                "1950acb3.6fbcb3"
            ]
        ]
    },
    {
        "id": "1950acb3.6fbcb3",
        "type": "switch",
        "z": "1c9bcaf3.2cdef5",
        "name": "Receive Event",
        "property": "Tag",
        "propertyType": "msg",
        "rules": [
            {
                "t": "eq",
                "v": "Event",
                "vt": "str"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 320,
        "y": 140,
        "wires": [
            [
                "344b1670.2dbb6a",
                "3b5a1c2d.4806c4"
            ],
            []
        ]
    },
    {
        "id": "344b1670.2dbb6a",
        "type": "function",
        "z": "1c9bcaf3.2cdef5",
        "name": "Check for FlowRule-1 In",
        "func": "outMsg = {};\nif (msg.Data[0].CountingInfo[0].RuleName == 'Rule'){\n    outMsg.payload = msg.Data[0].CountingInfo[0].In;\n    outMsg.reset = false;\n    return outMsg;\n} ",
        "outputs": 1,
        "noerr": 0,
        "x": 610,
        "y": 100,
        "wires": [
            [
                "13960258.88068e"
            ]
        ]
    },
    {
        "id": "3b5a1c2d.4806c4",
        "type": "function",
        "z": "1c9bcaf3.2cdef5",
        "name": "Check for FlowRule-1 Out",
        "func": "outMsg = {};\nif (msg.Data[0].CountingInfo[0].RuleName == 'Rule'){\n    outMsg.payload = msg.Data[0].CountingInfo[0].Out;\n    outMsg.reset = false;\n    return outMsg;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "x": 610,
        "y": 160,
        "wires": [
            [
                "ebe409f6.fbbbd8"
            ]
        ]
    },
    {
        "id": "301cc19.1e81e3e",
        "type": "change",
        "z": "1c9bcaf3.2cdef5",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "reset",
                "pt": "msg",
                "to": "payload",
                "tot": "msg"
            },
            {
                "t": "delete",
                "p": "payload",
                "pt": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 640,
        "y": 240,
        "wires": [
            [
                "13960258.88068e",
                "ebe409f6.fbbbd8"
            ]
        ]
    },
    {
        "id": "13960258.88068e",
        "type": "function",
        "z": "1c9bcaf3.2cdef5",
        "name": "Increment",
        "func": "var count = context.get('INcount')||0\nvar outMsg = {};\n\nif (msg.reset) {\n    count = 0;\n} else {\n    count += msg.payload;\n}\n\ncontext.set('INcount',count);\noutMsg.payload = count;\nreturn outMsg;",
        "outputs": 1,
        "noerr": 0,
        "x": 860,
        "y": 100,
        "wires": [
            [
                "3dbb5f8c.5494f"
            ]
        ]
    },
    {
        "id": "ebe409f6.fbbbd8",
        "type": "function",
        "z": "1c9bcaf3.2cdef5",
        "name": "Increment",
        "func": "var count = context.get('OUTcount')||0\nvar outMsg = {};\n\nif (msg.reset) {\n    count = 0;\n} else {\n    count += msg.payload;\n}\n\ncontext.set('OUTcount',count);\noutMsg.payload = count;\nreturn outMsg;",
        "outputs": 1,
        "noerr": 0,
        "x": 860,
        "y": 160,
        "wires": [
            [
                "df29e613.0e8ca8"
            ]
        ]
    },
    {
        "id": "3dbb5f8c.5494f",
        "type": "writeDP",
        "z": "1c9bcaf3.2cdef5",
        "name": "CountIn",
        "path": "Count_In",
        "server": "5abeb26f.e0d7dc",
        "bpath": "/Favorites/TailgateDetector/NodeRed/Count_In",
        "x": 1080,
        "y": 100,
        "wires": [
            []
        ]
    },
    {
        "id": "df29e613.0e8ca8",
        "type": "writeDP",
        "z": "1c9bcaf3.2cdef5",
        "name": "CountOut",
        "path": "Count_Out",
        "server": "5abeb26f.e0d7dc",
        "bpath": "/Favorites/TailgateDetector/NodeRed/Count_Out",
        "x": 1080,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "b94b3eb7.faa16",
        "type": "readDP",
        "z": "1c9bcaf3.2cdef5",
        "name": "CountReset",
        "path": "Count_Reset",
        "cov": true,
        "dpstatus": true,
        "cache": false,
        "covThreshold": "",
        "server": "5abeb26f.e0d7dc",
        "bpath": "/Favorites/Door1/NodeRed/Count_Reset",
        "x": 410,
        "y": 240,
        "wires": [
            [
                "301cc19.1e81e3e"
            ]
        ]
    },
    {
        "id": "90894fee.46bf5",
        "type": "http request",
        "z": "1c9bcaf3.2cdef5",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "paytoqs": false,
        "url": "http://192.168.50.49/axis-cgi/virtualinput/activate.cgi?schemaversion=1&port=1",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "digest",
        "x": 850,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "f5c439b8.16f408",
        "type": "readDP",
        "z": "1c9bcaf3.2cdef5",
        "name": "AlarmOutput",
        "path": "/Favorites/Door1/TailgateAlarm",
        "cov": true,
        "dpstatus": true,
        "cache": false,
        "covThreshold": "",
        "server": "5abeb26f.e0d7dc",
        "bpath": "/Favorites/Door1/TailgateAlarm",
        "x": 290,
        "y": 420,
        "wires": [
            [
                "60b1880c.98e7f8"
            ]
        ]
    },
    {
        "id": "60b1880c.98e7f8",
        "type": "switch",
        "z": "1c9bcaf3.2cdef5",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "true"
            },
            {
                "t": "else"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 450,
        "y": 420,
        "wires": [
            [
                "c8859ebc.1845b"
            ],
            [
                "a643f5ac.441588"
            ]
        ]
    },
    {
        "id": "c8859ebc.1845b",
        "type": "change",
        "z": "1c9bcaf3.2cdef5",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            },
            {
                "t": "delete",
                "p": "properties",
                "pt": "msg"
            },
            {
                "t": "delete",
                "p": "statusCode",
                "pt": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 620,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "bb337e26.5345f",
        "type": "http request",
        "z": "1c9bcaf3.2cdef5",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "paytoqs": false,
        "url": "http://192.168.50.49/axis-cgi/virtualinput/deactivate.cgi?schemaversion=1&port=1",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "digest",
        "x": 850,
        "y": 460,
        "wires": [
            []
        ]
    },
    {
        "id": "a643f5ac.441588",
        "type": "change",
        "z": "1c9bcaf3.2cdef5",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "true",
                "tot": "bool"
            },
            {
                "t": "delete",
                "p": "properties",
                "pt": "msg"
            },
            {
                "t": "delete",
                "p": "statusCode",
                "pt": "msg"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 620,
        "y": 460,
        "wires": [
            []
        ]
    },
    {
        "id": "8aaa169.7cedce8",
        "type": "comment",
        "z": "1c9bcaf3.2cdef5",
        "name": "Connect the http Requests after configuring the IP",
        "info": "",
        "x": 890,
        "y": 320,
        "wires": []
    },
    {
        "id": "71b8855c.22a67c",
        "type": "websocket-client",
        "z": "",
        "path": "ws://192.168.50.128:888",
        "tls": "",
        "wholemsg": "true"
    },
    {
        "id": "5abeb26f.e0d7dc",
        "type": "server-path",
        "z": "",
        "name": "LIOB 585 Door 1",
        "host": "localhost:443",
        "bpath": "/Favorites/Door1/NodeRed/"
    }
]
