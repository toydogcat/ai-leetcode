---
title: "LeetCode #213: House Robber II (打家劫舍 II)"
categories:
  - Array
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
你是一個專業的小偷，計劃偷竊沿街的房屋，每間房內都藏有一定的現金。這個地方所有的房屋都 **圍成一圈** ，這意味著第一個房屋和最後一個房屋是緊挨著的。同時，相鄰的房屋裝有相互連通的防盜系統，**如果兩間相鄰的房屋在同一晚上被小偷闖入，系統就會自動報警** 。
給定一個代表每個房屋存放金額的非負整數數組，計算你 **在不驚動警報裝置的情況下** ，今晚能夠偷竊到的最高金額。

## 解題心得：拆解環形結構
這題是 [House Robber I](./2026-04-29-leetcode-198-house-robber.md) 的進階版。差別在於首尾相連，不能同時偷第一家和最後一家。

**核心邏輯：**
環形問題通常可以轉化為兩個線性問題：
1. **方案 A**：不偷最後一家，範圍是 `[0, n-2]`。
2. **方案 B**：不偷第一家，範圍是 `[1, n-1]`。
3. 最終結果即為這兩個方案的最大值。

對於每一段線性數組，動態規劃方程為：
$dp[i] = \max(dp[i-1], dp[i-2] + nums[i])$

- **時間複雜度**: $O(N)$。
- **空間複雜度**: $O(1)$ (使用滾動變量優化)。

## 程式碼實作

### Python
```python
class Solution:
    def rob(self, nums: List[int]) -> int:
        def rob_linear(arr):
            prev2, prev1 = 0, 0
            for x in arr:
                prev2, prev1 = prev1, max(prev1, prev2 + x)
            return prev1
        
        n = len(nums)
        if n == 1: return nums[0]
        
        # 情況 1: 考慮 [0, n-2], 情況 2: 考慮 [1, n-1]
        return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int rob(std::vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        if (n == 2) return std::max(nums[0], nums[1]);
        
        return std::max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }

private:
    int robRange(std::vector<int>& nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; i++) {
            int current = std::max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
};
```
