---
title: "LeetCode #379: Design Phone Directory (設計電話目錄)"
categories:
  - Design
  - Hash Table
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個電話目錄，提供獲取未分配號碼、檢查號碼是否被分配、以及釋放號碼的 API。

## 解題心得
使用一個雙端佇列（或集合）`available` 來儲存當前所有可用的號碼，以及一個雜湊集合 `used` 記錄已被分配的號碼，藉此達到 $O(1)$ 常數時間的分配與釋放。

- **時間複雜度**: 每次操作 O(1)
- **空間複雜度**: O(N) 其中 N 是最大容量

## 程式碼實作

### Python
```python
from collections import deque

class PhoneDirectory:
    def __init__(self, maxNumbers: int):
        self.available = deque(range(maxNumbers))
        self.used = set()

    def get(self) -> int:
        if not self.available:
            return -1
        num = self.available.popleft()
        self.used.add(num)
        return num

    def check(self, number: int) -> bool:
        return number not in self.used

    def release(self, number: int) -> None:
        if number in self.used:
            self.used.remove(number)
            self.available.append(number)
```

### C++
```cpp
#include <unordered_set>
#include <queue>

class PhoneDirectory {
private:
    std::queue<int> available;
    std::unordered_set<int> used;

public:
    PhoneDirectory(int maxNumbers) {
        for (int i = 0; i < maxNumbers; ++i) {
            available.push(i);
        }
    }
    
    int get() {
        if (available.empty()) return -1;
        int num = available.front();
        available.pop();
        used.insert(num);
        return num;
    }
    
    bool check(int number) {
        return used.find(number) == used.end();
    }
    
    void release(int number) {
        if (used.count(number)) {
            used.erase(number);
            available.push(number);
        }
    }
};
```
