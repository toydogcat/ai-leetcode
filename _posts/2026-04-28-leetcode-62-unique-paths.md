---
title: "LeetCode #62: Unique Paths"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
一個機器人位於一個 `m x n` 網格的左上角 。機器人每次只能向下或向右移動一步。機器人試圖達到網格的右下角。問總共有多少條不同的路徑？

## 解題心得：匯聚的力量
這是一道非常經典的 DP 入門題。

**核心邏輯：**
你要走到格子 `(i, j)`，只有兩種可能：
1. 從 **上面** 的格子 `(i-1, j)` 往下走一步。
2. 從 **左邊** 的格子 `(i, j-1)` 往右走一步。

所以，到達 `(i, j)` 的方法數 = `到達上面的方法數` + `到達左邊的方法數`。
公式：$dp[i][j] = dp[i-1][j] + dp[i][j-1]$。

這就像是兩條小溪匯聚成一條大河，總水量等於兩支流之和。

### Python
```python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j-1]
        return dp[-1]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int uniquePaths(int m, int n) {
        std::vector<int> dp(n, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j-1];
            }
        }
        return dp[n-1];
    }
};
```
