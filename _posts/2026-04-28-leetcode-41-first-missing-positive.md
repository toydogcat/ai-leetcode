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

## 解題心得：自己的位置自己找
這題是 Hard，難點在於題目要求 $O(n)$ 時間且 **只能使用常數空間**。如果能用一個 `Set`，這題就變成 Easy 了。

**核心邏輯：原地哈希 (In-place Hash)**
想像有一排編號 1 到 $n$ 的位子，我們把數組裡的數字當作「人」。
1. **物歸原位**：我們遍歷每個人，如果這個人的號碼是 `x`（在 1 到 $n$ 之間），我們就請他去坐第 `x-1` 號位子。如果那裡已經有人坐了且號碼一樣，就不用動；否則就跟那裡的人換位子，直到當前位子的人「各就各位」或「號碼不對」。
2. **找出空缺**：排好之後，我們從頭看一遍。如果第 `i` 號位子坐的不是號碼 `i+1`，那 `i+1` 就是我們要找的最小正整數！

這就像是教室點名，大家先按學號坐好，沒坐對位置的那一號就是沒來的人。

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
