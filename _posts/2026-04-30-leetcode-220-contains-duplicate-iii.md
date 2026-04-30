---
title: "LeetCode #220: Contains Duplicate III (存在重複元素 III)"
categories:
  - Array
  - Sliding Window
  - Bucket Sort
  - Ordered Set
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` 和兩個整數 `indexDiff` 和 `valueDiff` 。
找出是否存在兩個不同的索引 `i` 和 `j` ，使得 `abs(i - j) <= indexDiff` 且 `abs(nums[i] - nums[j]) <= valueDiff` 。
如果存在，返回 `true` ；否則，返回 `false` 。

## 解題心得：桶排序 (Bucket Sort) 的思想
這題在 [Contains Duplicate II](./2026-04-30-leetcode-219-contains-duplicate-ii.md) 的基礎上增加了值範圍限制。

**核心邏輯：**
1. **問題轉化**：我們需要在一個大小為 `indexDiff` 的滑動窗口中，尋找是否有兩個數的差值 $\le valueDiff$。
2. **桶排序思想**：
   - 將數字放入大小為 `valueDiff + 1` 的桶中。
   - 桶的編號計算：`num // (valueDiff + 1)`。
   - 每個桶中最多隻會有一個數字（如果有兩個，則它們的差值一定 $\le valueDiff$，直接返回 `true`）。
   - 對於當前數字 `num`：
     - 檢查它所在的桶是否有值。
     - 檢查相鄰的兩個桶（左邊和右邊）是否有值，且差值 $\le valueDiff$。
   - 維護滑動窗口：當索引超過 `indexDiff` 時，刪除最老元素的桶。

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(\min(N, indexDiff))$。

## 程式碼實作

### Python
```python
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        if valueDiff < 0: return False
        buckets = {}
        width = valueDiff + 1
        
        for i, num in enumerate(nums):
            # 計算桶編號
            bucket_id = num // width
            
            # 1. 檢查當前桶
            if bucket_id in buckets:
                return True
            
            # 2. 檢查相鄰桶
            if (bucket_id - 1 in buckets and abs(num - buckets[bucket_id - 1]) < width):
                return True
            if (bucket_id + 1 in buckets and abs(num - buckets[bucket_id + 1]) < width):
                return True
            
            # 加入當前桶
            buckets[bucket_id] = num
            
            # 3. 維護滑動窗口
            if i >= indexDiff:
                del buckets[nums[i - indexDiff] // width]
                
        return False
```

### C++ (使用 set/lower_bound)
```cpp
#include <vector>
#include <set>
#include <algorithm>

class Solution {
public:
    bool containsNearbyAlmostDuplicate(std::vector<int>& nums, int indexDiff, int valueDiff) {
        std::set<long> window;
        for (int i = 0; i < nums.size(); i++) {
            // 找第一個大於等於 nums[i] - valueDiff 的數
            auto it = window.lower_bound((long)nums[i] - valueDiff);
            
            if (it != window.end() && *it <= (long)nums[i] + valueDiff) {
                return true;
            }
            
            window.insert(nums[i]);
            
            if (i >= indexDiff) {
                window.erase(nums[i - indexDiff]);
            }
        }
        return false;
    }
};
```
