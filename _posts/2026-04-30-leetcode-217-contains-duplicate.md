---
title: "LeetCode #217: Contains Duplicate (存在重複元素)"
categories:
  - Array
  - Hash Table
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` 。如果任一值在數組中出現 **至少兩次** ，返回 `true` ；如果數組中每個元素互不相同，返回 `false` 。

## 解題心得：哈希表
這是最基礎的查找重複元素的問題。

**核心邏輯：**
使用 **哈希集合 (Set)** 來存儲遍歷過的元素。
- 遍歷數組，檢查當前元素是否已經在集合中。
- 如果在，說明重複，返回 `true`。
- 如果不在，將當前元素加入集合。
- 遍歷結束仍未發現重複，返回 `false`。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(N)$。

## 程式碼實作

### Python
```python
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        # 利用 set 的長度來判斷
        return len(nums) != len(set(nums))
```

### C++
```cpp
#include <vector>
#include <unordered_set>

class Solution {
public:
    bool containsDuplicate(std::vector<int>& nums) {
        std::unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return true;
            seen.insert(num);
        }
        return false;
    }
};
```
