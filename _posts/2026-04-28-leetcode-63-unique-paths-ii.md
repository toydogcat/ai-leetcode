---
title: "LeetCode #63: Unique Paths II"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
與 62 題類似，但遇到障礙物時 $dp[i][j] = 0$。

### Python
```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [0] * n
        dp[0] = 1 if obstacleGrid[0][0] == 0 else 0
        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j-1]
        return dp[-1]
```

### C++
```cpp
#include <vector>

class Solution {
public:
    int uniquePathsWithObstacles(std::vector<std::vector<int>>& obstacleGrid) {
        int n = obstacleGrid[0].size();
        std::vector<long long> dp(n, 0);
        dp[0] = (obstacleGrid[0][0] == 0);
        for (const auto& row : obstacleGrid) {
            for (int j = 0; j < n; j++) {
                if (row[j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j-1];
            }
        }
        return (int)dp[n-1];
    }
};
```
