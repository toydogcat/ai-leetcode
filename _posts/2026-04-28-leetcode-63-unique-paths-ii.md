---
title: "LeetCode #63: Unique Paths II"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
一個機器人位於一個 `m x n` 網格的左上角。機器人每次只能向下或向右移動一步。機器人試圖達到網格的右下角。現在考慮網格中有障礙物。網格中的障礙物和空位分別用 `1` 和 `0` 來表示。問總共有多少條不同的路徑？

## 解題心得：遇到障礙就繞道
這題是 62 題的升級版，多了一些「路障」。

**核心邏輯：**
1. **邏輯延續**：每個格子的路徑數 = 左邊過來的方法數 + 上面過來的方法數。
2. **處理路障**：如果當前格子是 `1`（有障礙），那對不起，沒有人能走到這裡，方法數直接設為 **0**。
3. **初始化**：第一行和第一列也要注意。如果第一行中間有個障礙，那障礙後面的所有格子都去不了了（方法數全為 0）。

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
