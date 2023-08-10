---
title: Line Protocol
order: 1
---

Line protocol is a text-based format proposed by InfluxDB, and openGemini support the same line protocol to write data.

> About line protocol, please see [InfluxDB Line Protocol](https://docs.influxdata.com/influxdb/cloud/reference/syntax/line-protocol/)

## Write data

::: tabs

@tab CLI

Use the ts-cli command to write data into the openGemini database, and place the ```Insert``` in front of the line procotol:

```sql
> INSERT h2o_feet,location=coyote_creek water_level=2.927,description="below 3 feet" 1566102600
```

Import Line protocol data from a file using the CLI，suppose the data is saved in the file data.txt in line protocol format
```
// data.txt
h2o_feet,location=coyote_creek water_level=2.927,description="below 3 feet" 1566102600
h2o_feet,location=coyote_creek water_level=2.831,description="below 3 feet" 1566102960
h2o_feet,location=coyote_creek water_level=2.743,description="below 3 feet" 1566103320
h2o_feet,location=coyote_creek water_level=2.667,description="below 3 feet" 1566103680
h2o_feet,location=coyote_creek water_level=2.589,description="below 3 feet" 1566104040
h2o_feet,location=coyote_creek water_level=2.523,description="below 3 feet" 1566104400
h2o_feet,location=coyote_creek water_level=2.464,description="below 3 feet" 1566104760
h2o_feet,location=coyote_creek water_level=2.408,description="below 3 feet" 1566105120
h2o_feet,location=coyote_creek water_level=2.379,description="below 3 feet" 1566105480
h2o_feet,location=coyote_creek water_level=2.352,description="below 3 feet" 1566105840
h2o_feet,location=coyote_creek water_level=2.343,description="below 3 feet" 1566106200
h2o_feet,location=coyote_creek water_level=2.346,description="below 3 feet" 1566106560
```
Run the following command
```
> ts-cli -import -path=data.txt -host=127.0.0.1 -port=8086 -precision=s
```

@tab API

- Use the HTTP API to write data to openGemini  
use `POST` to make a request to the `/write method, and provide your line protocol in the request body:

```bash
curl -i -XPOST "http://localhost:8086/write?db=science_is_cool" --data-binary 'h2o_feet,location=coyote_creek water_level=2.927,description="below 3 feet" 1566102600'
```

- Write data in batches

```bash
curl -i -XPOST "http://localhost:8086/write?db=db0" --data-binary '
h2o_feet,location=coyote_creek water_level=2.927,description="below 3 feet" 1566102600
h2o_feet,location=coyote_creek water_level=2.831,description="below 3 feet" 1566102960
h2o_feet,location=coyote_creek water_level=2.743,description="below 3 feet" 1566103320
'
```
- Write file data
suppose the data is saved in the file data.txt in line protocol format
```
// data.txt
h2o_feet,location=coyote_creek water_level=2.927,description="below 3 feet" 1566102600
h2o_feet,location=coyote_creek water_level=2.831,description="below 3 feet" 1566102960
h2o_feet,location=coyote_creek water_level=2.743,description="below 3 feet" 1566103320
h2o_feet,location=coyote_creek water_level=2.667,description="below 3 feet" 1566103680
h2o_feet,location=coyote_creek water_level=2.589,description="below 3 feet" 1566104040
h2o_feet,location=coyote_creek water_level=2.523,description="below 3 feet" 1566104400
h2o_feet,location=coyote_creek water_level=2.464,description="below 3 feet" 1566104760
h2o_feet,location=coyote_creek water_level=2.408,description="below 3 feet" 1566105120
h2o_feet,location=coyote_creek water_level=2.379,description="below 3 feet" 1566105480
h2o_feet,location=coyote_creek water_level=2.352,description="below 3 feet" 1566105840
h2o_feet,location=coyote_creek water_level=2.343,description="below 3 feet" 1566106200
h2o_feet,location=coyote_creek water_level=2.346,description="below 3 feet" 1566106560
```
Use the following command to write data into openGemini
```
> curl -i -XPOST 'http://localhost:8086/write?db=db0' --data-binary @data.txt
```

:::
