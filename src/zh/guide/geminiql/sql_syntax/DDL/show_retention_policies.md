---
order: 2
---

# SHOW RETENTION POLICIES

返回指定数据库的**保留策略**列表。

## 语法

```sql
SHOW RETENTION POLICIES [ON <database_name>]
```

## 语法描述

`ON <database_name>`是可选项。如果查询中没有包含`ON <database_name>`，您必须在CLI中使用`USE <database_name>`指定数据库，或者在openGemini API请求中使用参数`db`指定数据库。

## 示例

### 运行带有`ON`子句的`SHOW RETENTION POLICIES`查询

```sql
>>> SHOW RETENTION POLICIES ON NOAA_water_database
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| name    | duration | shardGroupDuration | hot duration | warm duration | index duration | replicaN | default |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| autogen | 0s       | 168h0m0s           | 0s           | 0s            | 168h0m0s       | 1        | true    |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
8 columns, 1 rows in set
```

该查询以表格的形式返回数据库`NOAA_water_database`中所有的保留策略。这个数据库有一个名为`autogen`的保留策略，该保留策略具有无限的持续时间，为期7天的shard group持续时间，复制系数为1，并且它是这个数据库的默认(`DEFAULT`)保留策略。

### 运行不带有`ON`子句的`SHOW RETENTION POLICIES`查询

::: tabs

@tab CLI

使用`USE <database_name>`指定数据库

```bash
>>> use NOAA_water_database
Elapsed: 704ns
>>> SHOW RETENTION POLICIES
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| name    | duration | shardGroupDuration | hot duration | warm duration | index duration | replicaN | default |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
| autogen | 0s       | 168h0m0s           | 0s           | 0s            | 168h0m0s       | 1        | true    |
+---------+----------+--------------------+--------------+---------------+----------------+----------+---------+
8 columns, 1 rows in set
```

@tab API

使用参数`db`指定数据库

```bash
~$ curl -G "http://localhost:8086/query?db=NOAA_water_database&pretty=true" --data-urlencode "q=SHOW RETENTION POLICIES"

{
    "results": [
        {
            "statement_id": 0,
            "series": [
                {
                    "columns": [
                        "name",
                        "duration",
                        "shardGroupDuration",
                        "hot duration",
                        "warm duration",
                        "index duration",
                        "replicaN",
                        "default"
                    ],
                    "values": [
                        [
                            "autogen",
                            "0s",
                            "168h0m0s",
                            "0s",
                            "0s",
                            "168h0m0s",
                            1,
                            true
                        ]
                    ]
                }
            ]
        }
    ]
}
```

:::