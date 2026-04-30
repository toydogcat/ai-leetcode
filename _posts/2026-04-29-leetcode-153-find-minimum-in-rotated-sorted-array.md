---
title: "LeetCode #153: Find Minimum in Rotated Sorted Array (尋找旋轉排序陣列中的最小值)"
categories:
  - Array
  - Binary Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
已知一個長度為 `n` 的陣列，預先按照升序排列，經由 `1` 到 `n` 次 **旋轉** 後，得到輸入陣列 `nums` 。
例如，原陣列 `[0,1,2,4,5,6,7]` 在旋轉 4 次後可能會變成 `[4,5,6,7,0,1,2]` 。
請找出並返回陣列中的 **最小元素**。

你必須設計一個時間複雜度為 $O(\log n)$ 的演算法。

## 解題心得：二分搜尋的變形
看到 $O(\log n)$ 就要直覺想到 **二分搜尋 (Binary Search)**。

**核心邏輯**：
在一個旋轉過的有序陣列中，我們總是可以透過比較中間值 `nums[mid]` 和最右邊值 `nums[right]` 來判斷最小值在哪一邊：
1. **`nums[mid] < nums[right]`**：
   代表從 `mid` 到 `right` 這段是連續遞增的，所以最小值一定在 `mid` 或是 `mid` 的左側。
   - `right = mid`
2. **`nums[mid] > nums[right]`**：
   代表從 `mid` 到 `right` 之間發生了斷層（旋轉點），所以最小值一定在 `mid` 的右側。
   - `left = mid + 1`

- **時間複雜度**: $O(\log n)$。
- **空間複雜度**: $O(1)$。

## 程式碼實作

### Python
```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        
        while left < right:
            mid = (left + right) // 2
            
            if nums[mid] > nums[right]:
                # 最小值在右半部
                left = mid + 1
            else:
                # 最小值在左半部（包含 mid）
                right = mid
                
        return nums[left]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int findMin(std::vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
};
```
