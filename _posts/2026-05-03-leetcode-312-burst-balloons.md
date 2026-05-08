---
title: "LeetCode #312: Burst Balloons (戳氣球)"
categories:
  - Array
  - Dynamic Programming
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
有 `n` 個氣球，每個氣球上有一個數字。戳破氣球 `i` 可以獲得 `nums[i-1] * nums[i] * nums[i+1]` 枚硬幣。求戳破所有氣球能獲得的最大硬幣數。

## 解題心得
如果使用自頂向下的戳氣球順序，每次戳破氣球都會改變相鄰關係，狀態非常難維護。我們可以轉為**自底向上的區間動態規劃 (Interval DP)**：
- 在數組首尾各添加一個邊界元素 `'1'`，此時氣球範圍為 `(0, n+1)`。
- 設 `dp[i][j]` 表示戳破開區間 `(i, j)` 之間所有氣球所能獲得的最大硬幣數。
- 我們列舉最後一個被戳破的氣球 `k` ($i < k < j$)：
  `dp[i][j] = max(dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j])`。

- **時間複雜度**: O(N^3)
- **空間複雜度**: O(N^2)

## 程式碼實作

### Python
```python
class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        vals = [1] + nums + [1]
        n = len(vals)
        dp = [[0] * n for _ in range(n)]
        
        # length 是一步步擴大開區間 (i, j) 的長度
        for length in range(2, n):
            for i in range(n - length):
                j = i + length
                for k in range(i + 1, j):
                    dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + vals[i] * vals[k] * vals[j])
                    
        return dp[0][n - 1]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxCoins(std::vector<int>& nums) {
        std::vector<int> vals = {1};
        vals.insert(vals.end(), nums.begin(), nums.end());
        vals.push_back(1);
        
        int n = vals.size();
        std::vector<std::vector<int>> dp(n, std::vector<int>(n, 0));

        for (int len = 2; len < n; ++len) {
            for (int i = 0; i < n - len; ++i) {
                int j = i + len;
                for (int k = i + 1; k < j; ++k) {
                    dp[i][j] = std::max(dp[i][j], dp[i][k] + dp[k][j] + vals[i] * vals[k] * vals[j]);
                }
            }
        }
        return dp[0][n - 1];
    }
};
```
