---
title: "LeetCode #346: Moving Average from Data Stream (資料流中的移動平均值)"
categories:
  - Design
  - Queue
  - Array
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個整數資料流和一個視窗大小，計算該滑動視窗內所有整數的移動平均值。

## 解題心得
我們可以使用一個 **雙端佇列 (Queue / Deque)**：
- 維護佇列中的元素以及佇列內所有元素的累加和 `total_sum`。
- 當呼叫 `next(val)` 時：
  - 將 `val` 放入佇列末端，並 `total_sum += val`。
  - 如果此時佇列長度大於視窗大小 `size`，我們從佇列前端彈出一個元素，並 `total_sum -= popped`。
  - 移動平均值即為 `total_sum / len(queue)`。

- **時間複雜度**: 每次操作 $O(1)$
- **空間複雜度**: O(S) 其中 $S$ 是視窗大小

## 程式碼實作

### Python
```python
from collections import deque

class MovingAverage:
    def __init__(self, size: int):
        self.queue = deque()
        self.size = size
        self.total_sum = 0

    def next(self, val: int) -> float:
        self.queue.append(val)
        self.total_sum += val
        if len(self.queue) > self.size:
            self.total_sum -= self.queue.popleft()
        return self.total_sum / len(self.queue)
```

### C++
```cpp
#include <queue>

class MovingAverage {
private:
    std::queue<int> q;
    int maxSize;
    double totalSum;

public:
    MovingAverage(int size) {
        maxSize = size;
        totalSum = 0;
    }
    
    double next(int val) {
        q.push(val);
        totalSum += val;
        if (q.size() > maxSize) {
            totalSum -= q.front();
            q.pop();
        }
        return totalSum / q.size();
    }
};
```
