---
title: "LeetCode #381: Insert Delete GetRandom O(1) - Duplicates allowed (允許重複的 O(1) 設計)"
categories:
  - Design
  - Array
  - Hash Table
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
設計一個資料結構，支援在 $O(1)$ 時間內插入元素、刪除元素、以及隨機返回一個已存在的元素，允許元素重複。

## 解題心得
與 380 類似，但雜湊表的 value 必須是一個 **索引集合 (HashSet)**，記錄該值出現在陣列中的所有下標。刪除時，同樣將其與最後一個元素對調，但需要小心處理該元素本身就是最後一個元素，以及正確更新對應索引集合的細節。

- **時間複雜度**: 每次操作 O(1) 平均
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
import random

class RandomizedCollection:
    def __init__(self):
        self.nums = []
        self.val_to_indices = {}

    def insert(self, val: int) -> bool:
        not_present = val not in self.val_to_indices or not self.val_to_indices[val]
        if not_present:
            self.val_to_indices[val] = set()
        self.val_to_indices[val].add(len(self.nums))
        self.nums.append(val)
        return not_present

    def remove(self, val: int) -> bool:
        if val not in self.val_to_indices or not self.val_to_indices[val]:
            return False
        
        idx = self.val_to_indices[val].pop()
        last_val = self.nums[-1]
        
        if idx != len(self.nums) - 1:
            self.nums[idx] = last_val
            self.val_to_indices[last_val].add(idx)
            self.val_to_indices[last_val].remove(len(self.nums) - 1)
            
        self.nums.pop()
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

### C++
```cpp
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <cstdlib>

class RandomizedCollection {
private:
    std::vector<int> nums;
    std::unordered_map<int, std::unordered_set<int>> val_to_indices;

public:
    RandomizedCollection() {}
    
    bool insert(int val) {
        bool not_present = val_to_indices[val].empty();
        val_to_indices[val].insert(nums.size());
        nums.push_back(val);
        return not_present;
    }
    
    bool remove(int val) {
        if (val_to_indices[val].empty()) return false;
        
        int idx = *val_to_indices[val].begin();
        val_to_indices[val].erase(idx);
        
        int last_val = nums.back();
        if (idx != nums.size() - 1) {
            nums[idx] = last_val;
            val_to_indices[last_val].insert(idx);
            val_to_indices[last_val].erase(nums.size() - 1);
        }
        nums.pop_back();
        return true;
    }
    
    int getRandom() {
        return nums[std::rand() % nums.size()];
    }
};
```
