---
title: "LeetCode #41: First Missing Positive"
categories:
  - Array
  - Hash Table
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給你一個未排序的整數數組 `nums` ，請你找出其中沒有出現的最小的正整數。
請實現時間複雜度為 $O(n)$ 並且只使用常數級別額外空間的解決方案。

## 解題思路：原地哈希 (In-place Hash)
我們將數組當作哈希表，嘗試將數字 $x$ 放到索引 $x-1$ 的位置上。最後遍歷數組，第一個索引 $i$ 滿足 `nums[i] != i + 1` 的，就是缺失的正數。

### Python
```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                # 交換 nums[i] 到它應該在的位置 nums[nums[i]-1]
                idx = nums[i] - 1
                nums[i], nums[idx] = nums[idx], nums[i]
        
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int firstMissingPositive(std::vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                std::swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};
```
