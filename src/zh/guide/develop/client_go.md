---
title: client-go
order: 4
---

### **项目地址**

https://github.com/openGemini/opengemini-client-go

### 接口参考文档

https://pkg.go.dev/github.com/openGemini/opengemini-client-go

### 用法

#### 引入客户端库：

<i><font color=gray>示例使用点引用法，用户可结合具体需要选择适合的引用方式。</font></i>

```go
import . "github.com/openGemini/opengemini-client-go/opengemini"
```

#### 创建客户端：

```go
config := &Config{
	Addresses: []*Address{
		{
			Host: "127.0.0.1",
			Port: 8086,
		},
	},
}
client, err := NewClient(config)
if err != nil {
	fmt.Println(err)
}
```

#### 创建数据库：

```go
exampleDatabase := "ExampleDatabase"
err = client.CreateDatabase(exampleDatabase)
if err != nil {
	fmt.Println(err)
	return
}
```

#### 写入单个点：

```go
exampleMeasurement := "ExampleMeasurement"
point := &Point{}
point.SetMeasurement(exampleMeasurement)
point.AddTag("Weather", "foggy")
point.AddField("Humidity", 87)
point.AddField("Temperature", 25)
err = client.WritePoint(context.Background(),exampleDatabase, point, func(err error) {
	if err != nil {
		fmt.Printf("write point failed for %s", err)
	}
})
if err != nil {
	fmt.Println(err)
}
```

#### 批量写入点：

```go
exampleMeasurement := "ExampleMeasurement"
bp := &BatchPoints{}
var tagList []string
tagList = append(tagList, "sunny", "rainy", "windy")
for i := 0; i < 10; i++ {
	p := &Point{}
	p.SetMeasurement(exampleMeasurement)
	p.AddTag("Weather", tagList[rand.Int31n(3)])
	p.AddField("Humidity", rand.Int31n(100))
	p.AddField("Temperature", rand.Int31n(40))
	p.SetTime(time.Now())
	bp.AddPoint(p)
	time.Sleep(time.Nanosecond)
}
err = client.WriteBatchPoints(exampleDatabase, bp)
if err != nil {
	fmt.Println(err)
}
```

#### 执行查询：

```go
q := Query{
	Database: exampleDatabase,
	Command:  "select * from " + exampleMeasurement,
}
res, err := client.Query(q)
if err != nil {
	fmt.Println(err)
}
for _, r := range res.Results {
	for _, s := range r.Series {
		for _, v := range s.Values {
			for _, i := range v {
				fmt.Print(i)
				fmt.Print(" | ")
			}
			fmt.Println()
		}
	}
}
```

#### 查询Measurement的Tag键列表

```go
> show tag keys from cpu;
name: cpu
+--------+
| tagKey |
+--------+
| host   |
| region |
+--------+

// cmd := "show tag keys"
// cmd := "show tag keys from MEASUREMENT_NAME"
// cmd := "show tag keys from MEASUREMENT_NAME limit N offset M"
cmd := fmt.Sprintf("SHOW TAG KEYS FROM %s", "cpu")
value, err := client.ShowTagKeys("db0", cmd)
if err != nil {
	fmt.Println(err)
}
for _, result := range value {
	fmt.Printf("measurement: %+v\n", result.Measurement) // cpu
	fmt.Printf("tags: %v", result.Values) // ["host", "region"]
}
```

#### 查询Measurement的Tag键值列表

```go
> show tag values from cpu with key = "host";
name: cpu
+------+----------+
| key  |  value   |
+------+----------+
| host | server01 |
| host | server02 |
+------+----------+

cmd := fmt.Sprintf("show tag values from %s with key = \"%s\"", "cpu", "host")
value, err := client.ShowTagValues("db0", cmd)
if err != nil {
	fmt.Println(err)
}
for _, result := range values {
	fmt.Printf("measurement: %s\n", result.Measurement) // cpu
	fmt.Printf("kv: %+v\n", result.Values) // [{Name:host Value:server01},{Name:host Value:server02}]
}
```

#### 查询Measurement的Field Schema

```go
> show field keys
name: cpu
+----------+-----------+
| fieldKey | fieldType |
+----------+-----------+
| value    | float     |
+----------+-----------+

// cmd := "show field keys"
// cmd := "show field keys from MEASUREMENT_NAME"
cmd := fmt.Sprintf("show field keys")
value, err := client.ShowFieldKeys("db0", cmd)
if err != nil {
	fmt.Println(err)
}
for _, result := range values {
	fmt.Printf("measurement: %s\n", result.Measurement) // cpu
	fmt.Printf("kv: %+v\n", result.Values) // [{Name:value Value:float}]
}
```
