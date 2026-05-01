---
title: "LeetCode #279: Perfect Squares (完全平方數)"
categories:
  - Math
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個整數 `n` ，返回和為 `n` 的 **完全平方數** 的最少數量。

**完全平方數** 是一個整數，其值等於另一個整數的平方；換句話說，其值等於一個整數自乘的積。例如，`1`、`4`、`9` 和 `16` 都是完全平方數，而 `3` 和 `11` 不是。

**範例 1:**
```
輸入: n = 12
輸出: 3 
解釋: 12 = 4 + 4 + 4
```

**範例 2:**
```
輸入: n = 13
輸出: 2
解釋: 13 = 4 + 9
```

## 解題心得：動態規劃 (Dynamic Programming)
這題可以使用動態規劃（DP）來解決。我們將問題看作是完全背包問題的變體：
求湊出總和為 $n$ 的最少完全平方數個數。

**核心邏輯**：
1. **定義狀態**：`dp[i]` 表示組成數字 `i` 的最少完全平方數個數。
2. **狀態轉移方程**：
   - 對於每個數字 $i$，它可以由某個較小的值 $i - j^2$ 加上一個完全平方數 $j^2$ 轉換而來。
   - 我們枚舉所有可能的完全平方數 $j^2 \le i$：
     $$dp[i] = \min(dp[i], dp[i - j^2] + 1)$$
3. **初始狀態**：
   - `dp[0] = 0`，其餘位置初始化為一個極大值（例如 `inf`）。

- **時間複雜度**: $O(N \sqrt{N})$。外層迴圈遍歷 $N$ 個數字，內層枚舉約 $\sqrt{N}$ 個完全平方數。
- **空間複雜度**: $O(N)$，用於維護 `dp` 數組。

## 程式碼實作

### Python
```python
import math

class Solution:
    def numSquares(self, n: int) -> int:
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        
        for i in range(1, n + 1):
            # 枚舉所有小於等於 i 的完全平方數
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
                
        return dp[n]
```

### C++
```cpp
#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int numSquares(int n) {
        std::vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;

        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j * j <= i; ++j) {
                dp[i] = std::min(dp[i], dp[i - j * j] + 1);
            }
        }

        return dp[n];
    }
};
```
