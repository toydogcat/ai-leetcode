---
title: "LeetCode #380: Insert Delete GetRandom O(1) (常數時間插入、刪除和獲取隨機元素)"
categories:
  - Design
  - Array
  - Hash Table
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
設計一個資料結構，支援在 $O(1)$ 時間內插入元素、刪除元素、以及隨機返回一個已存在的元素。

## 解題心得
- 為了支援 $O(1)$ 隨機獲取元素，我們必須使用一個 **動態陣列 (Array / List)**。
- 為了支援 $O(1)$ 插入與刪除，我們配合一個 **雜湊表 (HashMap)**，其 key 為元素值，value 為元素在陣列中的索引。
- 刪除元素時，為了避免陣列搬移造成的 $O(N)$ 複雜度，我們將 **待刪除元素與陣列最後一個元素進行對調**，更新最後一個元素在雜湊表中的索引，接著直接彈出陣列尾端元素即可。

- **時間複雜度**: 每次操作 O(1)
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
import random

class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.val_to_idx = {}

    def insert(self, val: int) -> bool:
        if val in self.val_to_idx:
            return False
        self.val_to_idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.val_to_idx:
            return False
        idx = self.val_to_idx[val]
        last_val = self.nums[-1]
        
        # 將最後一個元素搬到待刪除元素的位置
        self.nums[idx] = last_val
        self.val_to_idx[last_val] = idx
        
        # 刪除尾巴
        self.nums.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

### C++
```cpp
#include <vector>
#include <unordered_map>
#include <cstdlib>

class RandomizedSet {
private:
    std::vector<int> nums;
    std::unordered_map<int, int> val_to_idx;

public:
    RandomizedSet() {}
    
    bool insert(int val) {
        if (val_to_idx.count(val)) return false;
        val_to_idx[val] = nums.size();
        nums.push_back(val);
        return true;
    }
    
    bool remove(int val) {
        if (!val_to_idx.count(val)) return false;
        int idx = val_to_idx[val];
        int last_val = nums.back();

        nums[idx] = last_val;
        val_to_idx[last_val] = idx;

        nums.pop_back();
        val_to_idx.erase(val);
        return true;
    }
    
    int getRandom() {
        return nums[std::rand() % nums.size()];
    }
};
```
