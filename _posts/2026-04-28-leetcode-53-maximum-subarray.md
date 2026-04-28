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

## 解題心得：斷捨離的智慧
這題是動態規劃（DP）最知名的應用之一：**加德納算法 (Kadane's Algorithm)**。

**核心邏輯：**
我們遍歷數組，維護一個「當前的累加和」`current_sum`。
對於每一個新數字 `x`，我們面臨兩個選擇：
1. **跟前面的人繼續過**：`current_sum + x`。
2. **跟過去斷絕關係，重新開始**：`x` 本身。

**怎麼選？**
如果 `current_sum + x < x`（也就是說 `current_sum` 是負的，只會拖累你），那我們就果斷拋棄過去，從 `x` 重新開始。

這就像是創業，如果之前的虧損已經大到不如重新開一家公司，那就重新開始吧！

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
