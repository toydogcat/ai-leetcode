---
title: "LeetCode #4: Median of Two Sorted Arrays"
categories:
  - Array
  - Binary Search
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定兩個大小分別為 `m` 和 `n` 的正序數組 `nums1` 和 `nums2`。請你找出並返回這兩個正序數組的 **中位數**。

## 數學邏輯
我們需要在兩個數組中找到一個劃分點，使得左側元素的數量等於右側（或多一個），且左側最大值小於等於右側最小值。

設劃分點分別為 $i$ 和 $j$，需滿足：
$$i + j = \frac{m + n + 1}{2}$$
$$nums1[i-1] \le nums2[j] \quad \text{and} \quad nums2[j-1] \le nums1[i]$$

- **時間複雜度**: $O(\log(\min(m, n)))$
- **空間複雜度**: $O(1)$

## 程式碼實作

### Python
```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        
        m, n = len(nums1), len(nums2)
        low, high = 0, m
        
        while low <= high:
            i = (low + high) // 2
            j = (m + n + 1) // 2 - i
            
            maxLeft1 = float('-inf') if i == 0 else nums1[i-1]
            minRight1 = float('inf') if i == m else nums1[i]
            
            maxLeft2 = float('-inf') if j == 0 else nums2[j-1]
            minRight2 = float('inf') if j == n else nums2[j]
            
            if maxLeft1 <= minRight2 and maxLeft2 <= minRight1:
                if (m + n) % 2 == 0:
                    return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0
                else:
                    return max(maxLeft1, maxLeft2)
            elif maxLeft1 > minRight2:
                high = i - 1
            else:
                low = i + 1
```

### C++
```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        
        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;
            
            int maxLeft1 = (i == 0) ? INT_MIN : nums1[i-1];
            int minRight1 = (i == m) ? INT_MAX : nums1[i];
            
            int maxLeft2 = (j == 0) ? INT_MIN : nums2[j-1];
            int minRight2 = (j == n) ? INT_MAX : nums2[j];
            
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 0) {
                    return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
                } else {
                    return max(maxLeft1, maxLeft2);
                }
            } else if (maxLeft1 > minRight2) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }
};
```
