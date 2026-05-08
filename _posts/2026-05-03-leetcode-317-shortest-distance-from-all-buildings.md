---
title: "LeetCode #317: Shortest Distance from All Buildings (離所有建築物最近的距離)"
categories:
  - Breadth-First Search
  - Matrix
tags:
  - Hard
  - Python
  - C++
---

{% raw %}
## 題目描述
給你一個 `m x n` 的網格，其中 `'1'` 代表建築，`'2'` 代表障礙物，`'0'` 代表空地。你想建造一棟新房子，這棟房子必須建在某個空地上，並且能走到所有建築物。求這棟新房子到所有建築物距離和的最小值。

## 解題心得
為了有效避免重複搜尋，我們可以 **從每個建築物 (值为 1) 開始進行 BFS**：
- 每次 BFS 計算該建築到所有空地的距離，並在全局矩陣 `dist` 中累加每個空地到所有走過建築的距離和。
- 同時使用一個 `reach` 矩陣，記錄每個空地能到達的建築個數。
- 為了節省空間，我們可以使用優化：在第 `k` 次 BFS 中，只有在前一次 BFS 中已被造訪過（即 `reach` 值為 `k-1`）的空地，我們才進一步走訪。
- 最終遍歷所有空地，找到 `reach[i][j] == 建築總數` 中 `dist[i][j]` 最小的值。

- **時間複雜度**: O(B \times M \times N)，其中 $B$ 是建築物數量
- **空間複雜度**: O(M \times N)

## 程式碼實作

### Python
```python
from collections import deque

class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]: return -1
        m, n = len(grid), len(grid[0])
        dist = [[0] * n for _ in range(m)]
        reach = [[0] * n for _ in range(m)]
        buildings = 0
        
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 1:
                    buildings += 1
                    queue = deque([(r, c, 0)])
                    visited = [[False] * n for _ in range(m)]
                    while queue:
                        curr_r, curr_c, d = queue.popleft()
                        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                            nr, nc = curr_r + dr, curr_c + dc
                            if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] == 0:
                                visited[nr][nc] = True
                                dist[nr][nc] += d + 1
                                reach[nr][nc] += 1
                                queue.append((nr, nc, d + 1))
                                
        min_d = float('inf')
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 0 and reach[r][c] == buildings:
                    min_d = min(min_d, dist[r][c])
                    
        return min_d if min_d != float('inf') else -1
```

### C++
```cpp
#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

class Solution {
public:
    int shortestDistance(std::vector<std::vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        std::vector<std::vector<int>> dist(m, std::vector<int>(n, 0));
        std::vector<std::vector<int>> reach(m, std::vector<int>(n, 0));
        int buildings = 0;

        int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    buildings++;
                    std::queue<std::pair<int, int>> q;
                    std::vector<std::vector<bool>> visited(m, std::vector<bool>(n, false));
                    q.push({r, c});
                    int d = 0;

                    while (!q.empty()) {
                        int size = q.size();
                        d++;
                        for (int i = 0; i < size; ++i) {
                            auto [curr_r, curr_c] = q.front();
                            q.pop();

                            for (auto& dir : dirs) {
                                int nr = curr_r + dir[0];
                                int nc = curr_c + dir[1];

                                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 0) {
                                    visited[nr][nc] = true;
                                    dist[nr][nc] += d;
                                    reach[nr][nc]++;
                                    q.push({nr, nc});
                                }
                            }
                        }
                    }
                }
            }
        }

        int minD = INT_MAX;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 0 && reach[r][c] == buildings) {
                    minD = std::min(minD, dist[r][c]);
                }
            }
        }
        return minD == INT_MAX ? -1 : minD;
    }
};
```
{% endraw %}
