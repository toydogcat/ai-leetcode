---
title: "LeetCode #322: Coin Change (零錢兌換)"
categories:
  - Array
  - Dynamic Programming
  - Breadth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數陣列 `coins`，表示不同面額的硬幣；以及一個整數 `amount`，表示總金額。
計算並返回可以湊成總金額所需的**最少硬幣個數**。如果無法湊成，返回 -1。

## 解題心得
這是一個經典的完全背包（Unbounded Knapsack）動態規劃問題。我們可以使用 **一維動態規劃**：
- 設 `dp[i]` 表示湊齊金額 `i` 所需的最少硬幣個數。
- 初始狀態：`dp[0] = 0`，其餘為無限大（`inf`）。
- 狀態轉移方程：`dp[i] = min(dp[i], dp[i - coin] + 1)`，其中 `coin` 為硬幣列表中的所有面額。
- 最終答案為 `dp[amount]`，若為無限大則代表無解，返回 -1。

- **時間複雜度**: O(N \times C)，其中 $N$ 是 `amount`，$C$ 是硬幣種類數
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        
        for i in range(1, amount + 1):
            for coin in coins:
                if i >= coin:
                    dp[i] = min(dp[i], dp[i - coin] + 1)
                    
        return dp[amount] if dp[amount] != float('inf') else -1
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int coinChange(std::vector<int>& coins, int amount) {
        std::vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; ++i) {
            for (int coin : coins) {
                if (i >= coin) {
                    dp[i] = std::min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```
