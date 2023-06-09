---
title: Sample data
order: 1
---


# Sample data

To further your learning of GeminiQL, this section will provide sample data for you to download and teach you how to import the data into the database. The sample data is referenced in the Data Exploration, Schema Exploration and GeminiQL Functions sections.

```
https://s3.amazonaws.com/noaa.water-database/NOAA_data.txt
```

## Importing data：
```shell
curl -G  https://s3.amazonaws.com/noaa.water-database/NOAA_data.txt > NOAA_data.txt

ts-cli -import -path=NOAA_data.txt -host=127.0.0.1 -port=8086 -precision=s
```

Data is automatically imported into the database: NOAA_water_database
