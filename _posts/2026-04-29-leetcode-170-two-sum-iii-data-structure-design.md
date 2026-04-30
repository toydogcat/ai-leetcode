---
title: "LeetCode #170: Two Sum III - Data Structure Design (兩數之和 III - 資料結構設計)"
categories:
  - Hash Table
  - Design
tags:
  - Easy
  - Python
  - C++
  - Premium
---

## 題目描述
這是一道 **LeetCode Premium** 題目。

設計並實現一個 `TwoSum` 類，使該類支持 `add` 和 `find` 操作。
- `add(number)`：向資料結構中添加一個整數 `number`。
- `find(value)`：尋找資料結構中是否存在任意兩個整數，使得它們之和等於 `value` 。

## 解題心得：平衡 add 與 find
這是一個經典的權衡 (Trade-off) 問題：是要讓 `add` 快，還是讓 `find` 快？

**常見策略**：
1. **哈希表存儲頻率**：
   - `add`: $O(1)$，只需在哈希表中更新計數。
   - `find`: $O(n)$，遍歷哈希表中的所有鍵。
   - **適合場景**：`add` 操作非常頻繁，而 `find` 操作較少。

2. **預先計算所有可能的和**：
   - `add`: $O(n)$，每添加一個數，就與之前的數配對存入哈希表。
   - `find`: $O(1)$，直接查表。
   - **適合場景**：`find` 呼叫次數遠超 `add`。

考慮到 LeetCode 的測資通常 `add` 與 `find` 都有一定數量，採用 **第一種方案 (哈希表存儲頻率)** 是最通用的。

- **時間複雜度**: `add` 為 $O(1)$, `find` 為 $O(n)$。
- **空間複雜度**: $O(n)$。

## 程式碼實作

### Python
```python
class TwoSum:

    def __init__(self):
        self.count = {}

    def add(self, number: int) -> None:
        self.count[number] = self.count.get(number, 0) + 1

    def find(self, value: int) -> bool:
        for num in self.count:
            complement = value - num
            if complement in self.count:
                # 關鍵：如果是兩個相同的數相加，頻率必須 > 1
                if complement != num or self.count[num] > 1:
                    return True
        return False
```

### C++
```cpp
#include <unordered_map>

class TwoSum {
private:
    std::unordered_map<long, int> count;

public:
    TwoSum() {}
    
    void add(int number) {
        count[number]++;
    }
    
    bool find(int value) {
        for (auto const& [num, freq] : count) {
            long complement = (long)value - num;
            if (count.count(complement)) {
                if (complement != num || freq > 1) {
                    return true;
                }
            }
        }
        return false;
    }
};
```
