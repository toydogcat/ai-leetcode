---
title: "LeetCode #31: Next Permutation"
categories:
  - Array
  - Two Pointers
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
1. 從後往前找到第一個相鄰升序對 `(i, i+1)`，此時 `i` 就是待交換的位置。
2. 從後往前找到第一個大於 `nums[i]` 的數 `nums[j]`。
3. 交換 `nums[i]` 和 `nums[j]`。
4. 反轉 `i+1` 之後的所有元素。

### Python
```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i+1]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while j >= 0 and nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        
        nums[i+1:] = reversed(nums[i+1:])
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    void nextPermutation(std::vector<int>& nums) {
        std::next_permutation(nums.begin(), nums.end());
    }
};
```
