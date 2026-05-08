---
title: "LeetCode #377: Combination Sum IV (組合總和 IV)"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個由不同正整數組成的陣列 `nums` 和一個目標整數 `target`。找出總和為 `target` 的排列個數。

## 解題心得
這是一道 **求排列數的動態規劃（完全背包求排列數）**：
- 設 `dp[i]` 表示總和為 `i` 的排列個數。
- 初始狀態：`dp[0] = 1`。
- 狀態轉移：因為順序不同視為不同排列，我們在外層循環遍歷金額 `i`，內層循環遍歷面額 `num`：
  `dp[i] += dp[i - num]` 當 `i >= num`。

- **時間複雜度**: O(N * target) 其中 N 是 nums 的長度
- **空間複雜度**: O(target)

## 程式碼實作

### Python
```python
class Solution:
    def combinationSum4(self, nums: List[int], target: int) -> int:
        dp = [0] * (target + 1)
        dp[0] = 1
        
        for i in range(1, target + 1):
            for num in nums:
                if i >= num:
                    dp[i] += dp[i - num]
                    
        return dp[target]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int combinationSum4(std::vector<int>& nums, int target) {
        std::vector<unsigned int> dp(target + 1, 0);
        dp[0] = 1;

        for (int i = 1; i <= target; ++i) {
            for (int num : nums) {
                if (i >= num) {
                    dp[i] += dp[i - num];
                }
            }
        }
        return dp[target];
    }
};
```
