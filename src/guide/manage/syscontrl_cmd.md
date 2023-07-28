---
order: 6
---


# System command
> Requests are all of the POST type
## store class


### 1.DataFlush（DataFlush）

- Function: Data in memory is forced to go down

- Parameters: mod=flush

- Example: Forced down disking of data on all node memory

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=flush'
  ```

### 2.compress（compactionEn）

- Function: Sets whether the shard enables compaction.

  1. allshards=true

     Set the compaction of all slices

  2. allshards=false

     Set the compaction of the specified slice

- Parameters：mod=compen&switchon=true/false&allshards=true/false&shid=[number]

- Example: Set the shard to enable compaction

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=compen&switchon=true&allshards=true'
  ```

### 3.Compression and merging（compmerge）

- Function: Set whether shard enables merge

  1. allshards=true

     Set the merge of all the slices

  2. allshards=false

     Set the merge for the specified slice

- Parameters：mod=merge&switchon=true/false&allshards=true/false&shard_id=[number]

- Example: Set the shard with d=4 to enable merge

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=merge&switchon=true&allshards=false&shard_id=4'
  ```

### 4.snapshot（snapshot）

- Function: Set the time interval for snapshots

- Parameters：mod=snapshot&duration=[time duration]

- Example: Set the snapshot interval to 30 minutes

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=snapshot&duration=30m'
  ```

### 5.Failpoint（Failpoint）

- Function: Enable/Disable the point of failure

- Parameters：mod=fallpoint&switchon=true/false&point=[]&term=[]

- Example：

  1. Disable Fault Points xxx

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=fallpoint&switch=false&point=xxx'
  ```

  2. Enabling Fault Points with the term parameter xxx

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=fallpoint&switch=true&point=xxx&term=xxx'
  ```

### 6.Downsampling order（DownSampleInOrder）

- Function: Set the order of downsampling traversal (sequential or inverse order to find eligible DownSamplePolicy)

- Parameters：mod=downsample_in_order&order=true/false（true order，false reverse order）

- Example: set to order

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=downsample_in_order&order=true'
  ```

### 7.Node Validation（verifyNode）

- Function: Set whether to verify the node status

- Parameters：mod=verifynode&switchon=true/false

- Example: Disabling Authentication Node Status

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=verifynode&switchon=false'
  ```

### 8.read-only operation（ReadOnly）

- Function: Sets the read/write permissions of the engine to be read-only

- Parameters：mod=readonly&switchon=true/false&allnodes=y

- Example：

  1. Set engine privileges read-only to all nodes

  ```
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=readonly&switchon=true&allnodes=y'
  ```

- 2. Set read-only engine privileges to the specified host

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=readonly&switchon=true&host=127.0.0.1
  ```



## sql class
>Send cmd to all nodes

### 1.chunk_reader parallel control(ChunkReaderParallel)

- Function：Set the maximum number of chunk_reader concurrency

- Parameters：mod=chunk_reader_parallel&limit=[number]  （number>=0）

- Example：Set the maximum chunk_reader concurrency to 4

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=chunk_reader_parallel&limit=4'
  ```

### 2.Binary Tree Merging Strategy（BinaryTreeMerge）

- Function：Set whether to enable the binary tree merge policy for queries

- Parameters：mod=binary_tree_merge&enabled=1/0

- Example：Set to use binary tree merge strategy for queries

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=binary_tree_merge&enabled=1'
  ```

### 3.Print Logical Plan（PrintLogicalPlan）

- Function：Set whether to print the logical plan

- Parameters：mod=print_logical_plan&enabled=1/0

- Example：Set to print out the logical plan when querying

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=print_logical_plan&enabled=1'
  ```

### 4.Sliding window push up（SlidingWindowPushUp）

- Function：Set whether sliding-window push is enabled when supporting aggregated push optimization plans and shema without subqueries

- Parameters：mod=sliding_window_push_up&enabled=1/0

- Example：With support for aggregation down push optimization plans and shema without subqueries **enabled** is sliding window push

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=sliding_window_push_up&enabled=1'
  ```

### 5.Log Rows（LogRows）

- Function：Set up rules for printing data to troubleshoot for missing data

- Parameters：mod=log_rows&switchon=true&rules=[Master Node Marker],key1=value1,key2=value2.....

- Example：Set as new log line rule master node tagged as mst with tag message tk1=tv1

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=log_rows&switchon=true&rules=mst,tk1=tv1'
  ```

### 6.Force broadcasting of queries（ForceBroadcastQuery）

- Function：Set the switch to perform a forced broadcast query

  1. on: for all slices
  2. off: for calculated slices

- Parameters：mod=force_broadcast_query&enabled=1/0

- Example：Force broadcasting of queries

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=force_broadcast_query&enabled=1'
  ```

### 7.Forced Time Filtering（TimeFilterProtection）

- Function：Set whether the query operation must have a time filter

- Parameters：mod=time_filter_protection&enabled=true/false

- Example：Set as a query operation must be time filtered

  ```bash
  curl -i -XPOST 'http://127.0.0.1:8086/debug/ctrl?mod=time_filter_protection&enabled=true'
  ```

## meta class

### 1.Switch Leader（SwitchLeader）

- Function：switch Leader

> Note: Leader execution of this command can take effect, that is, switching the Leader, Follower execution of this command will return to the Leader's address

- Parameters：none

- Example：

```bash
curl -i -XPOST 'http://127.0.0.1:8091/leadershiptransfer'
```

### 2.Viewing node information（ShowNodeInfo）
- Function：Viewing node information

- Parameters：witch=raft-stat

- Example：

```bash
curl -s -GET http://127.0.0.1:8091/debug?witch=raft-stat -H 'all:y' | python -mjson.tool
```