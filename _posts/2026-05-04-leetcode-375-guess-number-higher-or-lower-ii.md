---
title: "LeetCode #375: Guess Number Higher or Lower II (猜數字大小 II)"
categories:
  - Dynamic Programming
  - Math
  - Game Theory
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
猜數字遊戲，如果猜錯了，需要支付等同於你猜的數字的現金。計算在最壞情況下，要確保獲勝所需的最小現金。

## 解題心得
這是一道經典的 **區間動態規劃 (Interval DP) / 極小化極大博弈** 問題：
- 設 `dp[i][j]` 表示在範圍 `[i, j]` 內猜中正確數字所需的最小保證金額。
- 如果我們在範圍 `[i, j]` 內選擇猜 `x`（其中 `i <= x <= j`），最壞情況下的花費為 `x + max(dp[i][x-1], dp[x+1][j])`。
- 為了保證最少花費，我們應枚舉所有的 `x`，取其最小值：
  `dp[i][j] = min(x + max(dp[i][x-1], dp[x+1][j]))` 對於所有 $x \in [i, j]$。
- 邊界條件：當 `i >= j` 時，花費為 0。

- **時間複雜度**: O(N^3)
- **空間複雜度**: O(N^2)

## 程式碼實作

### Python
```python
class Solution:
    def getMoneyAmount(self, n: int) -> int:
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        
        # 區間長度從 2 到 n
        for length in range(2, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                dp[i][j] = float('inf')
                for x in range(i, j):
                    cost = x + max(dp[i][x - 1] if x > i else 0, dp[x + 1][j] if x < j else 0)
                    dp[i][j] = min(dp[i][j], cost)
                    
        return dp[1][n]
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int getMoneyAmount(int n) {
        std::vector<std::vector<int>> dp(n + 2, std::vector<int>(n + 2, 0));

        for (int len = 2; len <= n; ++len) {
            for (int i = 1; i <= n - len + 1; ++i) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                for (int x = i; x < j; ++x) {
                    int cost = x + std::max(dp[i][x - 1], dp[x + 1][j]);
                    dp[i][j] = std::min(dp[i][j], cost);
                }
            }
        }
        return dp[1][n];
    }
};
```
