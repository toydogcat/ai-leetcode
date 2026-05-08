---
title: "LeetCode #329: Longest Increasing Path in a Matrix (矩陣中的最長遞增路徑)"
categories:
  - Depth-First Search
  - Breadth-First Search
  - Graph
  - Dynamic Programming
  - Memoization
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個 `m x n` 整數矩陣 `matrix`，返回其最長遞增路徑的長度。在每個格子中，你可以往上下左右四個方向移動。

## 解題心得
由於路徑必須是「嚴格遞增」的，圖中不可能存在環。這是一個有向無環圖 (DAG)。我們可以使用 **記憶化搜索 (DFS + Memoization)**：
- 設 `memo[r][c]` 表示從格子 `(r, c)` 出發的最長遞增路徑長度。
- 遍歷周圍四個鄰居，如果鄰居的值大於當前格子的值：
  `memo[r][c] = max(memo[r][c], dfs(neighbor) + 1)`。
- 最終遍歷矩陣中所有的起點，找到最大的 `memo` 值。

- **時間複雜度**: O(M \times N)，因為每個格子最多隻會被完整計算並記錄一次
- **空間複雜度**: O(M \times N) 用於遞迴與儲存 memo 矩陣

## 程式碼實作

### Python
```python
class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        if not matrix or not matrix[0]: return 0
        m, n = len(matrix), len(matrix[0])
        memo = [[0] * n for _ in range(m)]
        
        def dfs(r, c):
            if memo[r][c] != 0:
                return memo[r][c]
            max_len = 1
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                    max_len = max(max_len, dfs(nr, nc) + 1)
            memo[r][c] = max_len
            return max_len

        return max(dfs(r, c) for r in range(m) for c in range(n))
```

### C++
```cpp
#include <vector>
#include <algorithm>

class Solution {
private:
    int m, n;
    std::vector<std::vector<int>> memo;
    int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    int dfs(const std::vector<std::vector<int>>& matrix, int r, int c) {
        if (memo[r][c] != 0) return memo[r][c];
        int maxLen = 1;
        for (auto& d : dirs) {
            int nr = r + d[0];
            int nc = c + d[1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
                maxLen = std::max(maxLen, dfs(matrix, nr, nc) + 1);
            }
        }
        return memo[r][c] = maxLen;
    }

public:
    int longestIncreasingPath(std::vector<std::vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        m = matrix.size();
        n = matrix[0].size();
        memo.assign(m, std::vector<int>(n, 0));

        int ans = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                ans = std::max(ans, dfs(matrix, r, c));
            }
        }
        return ans;
    }
};
```
