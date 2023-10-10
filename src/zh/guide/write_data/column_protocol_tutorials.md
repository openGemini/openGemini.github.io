---
title: 数据列协议写入
order: 4
---

InfluxDB Line Protocol协议是行协议，数据的解析与路由在写入的开销占比高达50%，对写性能影响很大。因此为提升整体写性能，拥抱大数据开源生态，采用Apache Arrow Flight协议(简称列协议)，建立常连接，使用Apache Arrow Record零拷贝对接内存数据格式Record，用随机均匀打散替代哈希打散方式，保证批量数据的并发写与追加，最大限度地提升写性能与线性度。

列协议写入目前采用GO API调用，具体流程如下：

## 列协议写入

### 环境信息

- go version 1.18+
- grpc v1.49.0
- apache arrow go实现 v0.0.0-20211112161151-bc219186db40

### 数据写入步骤

1. 构造数据

   ```
   func genArrowRecord(size int) array.Record{
       schema := arrow.NewSchema(
               []arrow.Field{
                   {Name: "age", Type: arrow.PrimitiveTypes.Int64},
                   {Name: "height", Type: arrow.PrimitiveTypes.Float64},
                   {Name: "address", Type: &arrow.StringType{}},
                   {Name: "alive", Type: &arrow.BooleanType{}},
                   {Name: "time", Type: arrow.PrimitiveTypes.Int64},
               },
               nil,
       )
   
       b := array.NewRecordBuilder(memory.DefaultAllocator, schema)
       defer b.Release()
   
       for i := 0; i < size; i++ {
               b.Field(0).(*array.Int64Builder).AppendValues([]int64{12, 20, 3, 30}, nil)
               b.Field(1).(*array.Float64Builder).AppendValues([]float64{70.0, 80.0, 90.0, 121.0}, nil)
               b.Field(2).(*array.StringBuilder).AppendValues([]string{"shenzhen", "shanghai", "beijin", "guangzhou"}, nil)
               b.Field(3).(*array.BooleanBuilder).AppendValues([]bool{true, false, true, false}, nil)
               b.Field(4).(*array.Int64Builder).AppendValues([]int64{1629129600000000000, 1629129601000000000, 1629129602000000000, 1629129603000000000}, nil)
       }
       return b.NewRecord()
   }
   ```

2. 建立GRPC网络连接

   ```
   Address := "127.0.0.1:8087" 
   client, err := flight.NewFlightClient(Address, nil, grpc.WithTransportCredentials(insecure.NewCredentials()))
   if err != nil {
   		t.Fatal(err)
   }
   defer client.Close()
   
   doPutClient, _ := client.DoPut(context.WithValue(ctx, Token, token))
   ```

3. 建立写入者writer

   ```
   data := genArrowRecord(10)
   wr := flight.NewRecordWriter(doPutClient, ipc.WithSchema(data.Schema()))
   wr.SetFlightDescriptor(&flight.FlightDescriptor{Path: []string{"{\"db\": \"db1\", \"rp\": \"rp1\", \"mst\": \"mst1\"}"}}) //告诉server，这批数据属于的db和rp以及表
   ```

4. 写入数据

   ```
   wr.Write(data)
   ```

