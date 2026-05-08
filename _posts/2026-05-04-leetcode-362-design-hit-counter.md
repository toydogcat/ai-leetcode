---
title: "LeetCode #362: Design Hit Counter (設計敲擊計數器)"
categories:
  - Design
  - Queue
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個敲擊計數器，統計過去 5 分鐘（300 秒）內的敲擊次數。

## 解題心得
使用佇列或陣列儲存：
- 為了支援 $O(1)$ 常數時間的操作，我們可以使用一個大小為 300 的兩個陣列：`times` 儲存時戳，`hits` 儲存敲擊數。
- 當我們呼叫 `hit(timestamp)` 時，我們將 `timestamp % 300` 定位到陣列索引。如果 `times[idx] != timestamp`，代表是一次新敲擊，重置其次數為 1；否則累加次數。
- 當呼叫 `getHits(timestamp)` 時，我們遍歷這 300 個位置，累加所有滿足 `timestamp - times[i] < 300` 的 `hits[i]`。

- **時間複雜度**: 每次操作 O(1)
- **空間複雜度**: O(1) 固定 300 的陣列空間

## 程式碼實作

### Python
```python
class HitCounter:
    def __init__(self):
        self.times = [0] * 300
        self.hits = [0] * 300

    def hit(self, timestamp: int) -> None:
        idx = timestamp % 300
        if self.times[idx] != timestamp:
            self.times[idx] = timestamp
            self.hits[idx] = 1
        else:
            self.hits[idx] += 1

    def getHits(self, timestamp: int) -> int:
        ans = 0
        for i in range(300):
            if timestamp - self.times[i] < 300:
                ans += self.hits[i]
        return ans
```

### C++
```cpp
#include <vector>

class HitCounter {
private:
    std::vector<int> times;
    std::vector<int> hits;

public:
    HitCounter() : times(300, 0), hits(300, 0) {}
    
    void hit(int timestamp) {
        int idx = timestamp % 300;
        if (times[idx] != timestamp) {
            times[idx] = timestamp;
            hits[idx] = 1;
        } else {
            hits[idx]++;
        }
    }
    
    int getHits(int timestamp) {
        int ans = 0;
        for (int i = 0; i < 300; ++i) {
            if (timestamp - times[i] < 300) {
                ans += hits[i];
            }
        }
        return ans;
    }
};
```
