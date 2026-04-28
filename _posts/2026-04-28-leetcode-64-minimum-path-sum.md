---
title: "LeetCode #64: Minimum Path Sum"
categories:
  - Dynamic Programming
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給定一個包含非負整數的 `m x n` 網格 `grid` ，請出一條從左上角到右下角的路徑，使得路徑上的數字總和為最小。注意：你每次只能向下或向右移動一步。

## 解題心得：挑最省錢的路走
這是一道標準的二維動態規劃（DP）題目。

**核心邏輯：**
你要想，要到達格子 `(i, j)`，只有兩條路：
1. 從 **左邊** `(i, j-1)` 過來。
2. 從 **上面** `(i-1, j)` 過來。

既然我們要總和最小，我們當然選這兩條路中比較「便宜」的那一條！
公式：$dp[i][j] = grid[i][j] + \min(dp[i-1][j], dp[i][j-1])$。

最後，我們只需要把整張地圖填滿，右下角的格子就是答案。

### Python
```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0: continue
                elif i == 0: grid[i][j] += grid[i][j-1]
                elif j == 0: grid[i][j] += grid[i-1][j]
                else: grid[i][j] += min(grid[i-1][j], grid[i][j-1])
        return grid[-1][-1]
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
public:
    int minPathSum(std::vector<std::vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                if (i == 0) grid[i][j] += grid[i][j-1];
                else if (j == 0) grid[i][j] += grid[i-1][j];
                else grid[i][j] += std::min(grid[i-1][j], grid[i][j-1]);
            }
        }
        return grid[m-1][n-1];
    }
};
```
