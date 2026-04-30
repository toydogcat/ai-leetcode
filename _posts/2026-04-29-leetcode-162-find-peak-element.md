---
title: "LeetCode #162: Find Peak Element (尋找峰值)"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
峰值元素是指其值大於左右相鄰元素的元素。
給你一個整數陣列 `nums`，找到峰值元素並返回其索引。如果陣列包含多個峰值，返回 **任何一個峰值** 所在位置即可。
你可以假設 `nums[-1] = nums[n] = -∞` 。

你必須設計並實現時間複雜度為 $O(\log n)$ 的演算法。

## 解題心得：在爬山中二分
這題最驚艷的地方在於，儘管陣列不是有序的，我們依然可以使用 **二分搜尋**。

**核心邏輯**：
想像你在爬山：
1. 隨便找一個點 `mid`。
2. 看看 `mid` 的右邊：
   - 如果 `nums[mid] < nums[mid + 1]`，說明你正在上坡，右邊一定會有一個峰值（即使右邊一直漲到最後，邊界外是 $-\infty$，所以最後一個就是峰值）。
     - `left = mid + 1`
   - 如果 `nums[mid] > nums[mid + 1]`，說明你正在下坡，左邊（包含 `mid`）一定會有一個峰值。
     - `right = mid`

這個邏輯保證了我們每次都能縮減一半的搜尋範圍，最終一定會停在某個峰值上。

- **時間複雜度**: $O(\log n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        
        while left < right:
            mid = (left + right) // 2
            
            if nums[mid] < nums[mid + 1]:
                # 往右爬坡
                left = mid + 1
            else:
                # 往左爬坡（或就在峰值）
                right = mid
                
        return left
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int findPeakElement(std::vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] < nums[mid + 1]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
};
```
