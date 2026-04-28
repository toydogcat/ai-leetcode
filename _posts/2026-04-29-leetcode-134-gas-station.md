---
title: "LeetCode #134: Gas Station"
categories:
  - Greedy
  - Array
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
在一個環路上有 `n` 個加油站，其中第 `i` 個加油站有汽油 `gas[i]` 升。
你有一輛油箱容量無限的汽車，從第 `i` 個加油站開往第 `i+1` 個加油站需要消耗汽油 `cost[i]` 升。你從其中的一個加油站出發，開始時油箱為空。
如果你可以繞環路行駛一週，則返回出發時的加油站編號，否則返回 `-1` 。

## 解題心得：油箱的底線
這題有兩個關鍵結論：
1. **總油量 >= 總消耗：** 如果總油量小於總消耗，無論從哪出發都跑不完。
2. **失敗的起點：** 如果從 A 出發最遠能走到 B，但走不到 B 的下一個站，那麼從 A 到 B 之間的任何一個站出發也都走不到 B 的下一個站。

基於這點，我們只需要遍歷一次：
- 紀錄當前的剩餘油量 `current_gas`。
- 如果 `current_gas < 0`，說明之前的起點都行不通，我們把起點設為下一個站，並重置 `current_gas`。

### Python
```python
class Solution:
    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
        if sum(gas) < sum(cost): return -1
        
        start = 0
        current_gas = 0
        for i in range(len(gas)):
            current_gas += gas[i] - cost[i]
            if current_gas < 0:
                start = i + 1
                current_gas = 0
                
        return start
```

### C++
```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total_gas = 0, total_cost = 0;
        int current_gas = 0, start = 0;
        
        for (int i = 0; i < gas.size(); ++i) {
            total_gas += gas[i];
            total_cost += cost[i];
            current_gas += gas[i] - cost[i];
            
            if (current_gas < 0) {
                start = i + 1;
                current_gas = 0;
            }
        }
        
        return (total_gas < total_cost) ? -1 : start;
    }
};
```
