---
title: "LeetCode #62: Unique Paths"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 解題思路：動態規劃
設 $dp[i][j]$ 為到達 $(i, j)$ 的路徑總數。
$$dp[i][j] = dp[i-1][j] + dp[i][j-1]$$

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
