---
title: "LeetCode #219: Contains Duplicate II (存在重複元素 II)"
categories:
  - Array
  - Hash Table
  - Sliding Window
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` 和一個整數 `k` ，判斷數組中是否存在兩個不同的索引 `i` 和 `j` ，滿足 `nums[i] == nums[j]` 且 `abs(i - j) <= k` 。如果存在，返回 `true` ；否則，返回 `false` 。

## 解題心得：滑動窗口 + 哈希表
這題在 [Contains Duplicate I](./2026-04-30-leetcode-217-contains-duplicate.md) 的基礎上增加了距離限制。

**核心邏輯：**
1. **哈希表法**：遍歷數組，用哈希表記錄每個數字 **最後一次出現的索引**。
   - 如果當前數字已在表中，計算當前索引與舊索引之差。
   - 如果差值 $\le k$，返回 `true`。
   - 否則更新表中的索引值。
2. **滑動窗口法**：維護一個大小最多為 `k` 的集合。
   - 當窗口超過 `k` 時，移除最左邊的元素。
   - 每次檢查新加入的元素是否已在集合中。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(\min(N, k))$。

## 程式碼實作

### Python
```python
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        lookup = {}
        for i, num in enumerate(nums):
            if num in lookup and i - lookup[num] <= k:
                return True
            lookup[num] = i
        return False
```

### C++
```cpp
#include <vector>
#include <unordered_map>

class Solution {
public:
    bool containsNearbyDuplicate(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> lookup;
        for (int i = 0; i < nums.size(); i++) {
            if (lookup.count(nums[i]) && i - lookup[nums[i]] <= k) {
                return true;
            }
            lookup[nums[i]] = i;
        }
        return false;
    }
};
```
