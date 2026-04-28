---
title: "LeetCode #34: Find First and Last Position of Element in Sorted Array"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個按照升序排列的整數數組 `nums`，和一個目標值 `target`。找出給定目標值在數組中的開始位置和結束位置。如果數組中不存在目標值 `target`，返回 `[-1, -1]`。

## 解題心得：二分法的邊界尋找
這題要求 $O(\log n)$，顯然還是要用二分查找。但難點在於，如果數組裡有很多個 `target`，我們怎麼找到「最左邊」和「最右邊」的那一個？

**核心邏輯：**
1. **封裝二分函數**：我們可以寫一個通用的二分函數 `findBound(isLeft)`。
2. **尋找最左邊**：當 `nums[mid] == target` 時，我們不急著返回，而是繼續往左邊縮小範圍（`right = mid - 1`），直到找不到為止。
3. **尋找最右邊**：同理，當 `nums[mid] == target` 時，我們往右邊縮小範圍（`left = mid + 1`）。

這就像是在一排一模一樣的書裡找第一本和最後一本。你找到一本之後，還要繼續往左右兩邊摸索，看看是不是還有同樣的書。

### Python
```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def findBound(isFirst):
            l, r = 0, len(nums) - 1
            res = -1
            while l <= r:
                mid = (l + r) // 2
                if nums[mid] == target:
                    res = mid
                    if isFirst: r = mid - 1
                    else: l = mid + 1
                elif nums[mid] < target: l = mid + 1
                else: r = mid - 1
            return res
        return [findBound(True), findBound(False)]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    std::vector<int> searchRange(std::vector<int>& nums, int target) {
        return {findBound(nums, target, true), findBound(nums, target, false)};
    }
    int findBound(std::vector<int>& nums, int target, bool isFirst) {
        int l = 0, r = nums.size() - 1, res = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) {
                res = mid;
                if (isFirst) r = mid - 1;
                else l = mid + 1;
            } else if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return res;
    }
};
```
