---
title: "LeetCode #53: Maximum Subarray"
categories:
  - Array
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數數組 `nums` ，請你找出一個具有最大和的連續子數組（子數組最少包含一個元素），返回其最大和。

## 解題思路：Kadane's Algorithm
設 $dp[i]$ 為以第 $i$ 個元素結尾的最大子數組和。
$$dp[i] = \max(nums[i], dp[i-1] + nums[i])$$

- **時間複雜度**: $O(n)$
- **空間複雜度**: $O(1)$

### Python
```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        curr_sum = max_sum = nums[0]
        for x in nums[1:]:
            curr_sum = max(x, curr_sum + x)
            max_sum = max(max_sum, curr_sum)
        return max_sum
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxSubArray(std::vector<int>& nums) {
        int currSum = nums[0], maxSum = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            currSum = std::max(nums[i], currSum + nums[i]);
            maxSum = std::max(maxSum, currSum);
        }
        return maxSum;
    }
};
```
