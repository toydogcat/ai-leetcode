---
title: "LeetCode #259: 3Sum Smaller (較小的三數之和)"
categories:
  - Array
  - Two Pointers
  - Binary Search
  - Sorting
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個長度為 `n` 的整數數組和一個目標值 `target` ，找出所有滿足 `nums[i] + nums[j] + nums[k] < target` 的三元組 `(i, j, k)` 的個數，其中 `0 <= i < j < k < n`。

## 解題心得：排序 + 雙指針
這是 [3Sum](./2026-04-29-leetcode-15-3sum.md) 的變體。重點在於如何快速計數。

**核心邏輯：**
1. **排序**：先對數組進行升序排序。
2. **固定一個數**：遍歷數組，固定第一個數 `nums[i]`。
3. **雙指針**：在 `(i, n-1]` 範圍內使用 `left` 和 `right` 指針。
   - 計算 `sum = nums[i] + nums[left] + nums[right]`。
   - **如果 `sum < target`**：
     - 因為數組是有序的，這意味著對於固定的 `i` 和 `left`，任何在 `(left, right]` 範圍內的第三個數都能滿足條件。
     - 符合條件的組合個數增加 `right - left`。
     - `left++` 繼續嘗試更大的數。
   - **如果 `sum >= target`**：
     - 需要減小總和，`right--`。

- **時間複雜度**: $O(N^2)$。
- **空間複雜度**: $O(1)$ 或 $O(\log N)$。

## 程式碼實作

### Python
```python
class Solution:
    def threeSumSmaller(self, nums: List[int], target: int) -> int:
        nums.sort()
        count = 0
        n = len(nums)
        
        for i in range(n - 2):
            left = i + 1
            right = n - 1
            while left < right:
                if nums[i] + nums[left] + nums[right] < target:
                    # 關鍵：[left+1, right] 範圍內的所有數都符合
                    count += (right - left)
                    left += 1
                else:
                    right -= 1
                    
        return count
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int threeSumSmaller(std::vector<int>& nums, int target) {
        if (nums.size() < 3) return 0;
        std::sort(nums.begin(), nums.end());
        int count = 0;
        int n = nums.size();
        
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                if (nums[i] + nums[left] + nums[right] < target) {
                    count += (right - left);
                    left++;
                } else {
                    right--;
                }
            }
        }
        return count;
    }
};
```
