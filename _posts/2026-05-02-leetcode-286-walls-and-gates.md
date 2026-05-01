---
title: "LeetCode #286: Walls and Gates (牆與門)"
categories:
  - Graph
  - Breadth-First Search
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
你被給定一個 `m x n` 的二維網格 `rooms`，網格中包含以下三種可能的值：
- `-1`：表示一堵牆或障礙物。
- `0`：表示一個門（Gate）。
- `INF`：表示一個空的房間。我們用 $2^{31} - 1 = 2147483647$ 來代表 `INF`。

請你將每個空房間的值填寫為 **該房間到最近的門的距離**。
如果房間無法到達任何一個門，則該房間的值保持 `INF`。

**範例 1:**
```
輸入: rooms = [
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647]
]

輸出: [
  [3, -1, 0, 1],
  [2, 2, 1, -1],
  [1, -1, 2, -1],
  [0, -1, 3, 4]
]
```

## 解題心得：多源廣度優先搜尋 (Multi-Source BFS)
本題是典型的圖遍歷最短路徑問題。要求出每個空房間到最近的門的距離，一個直接但低效的想法是對每個空房間發起一次 BFS 搜尋最近的門，這會導致極高的重複遍歷，時間複雜度高達 $O(M^2 N^2)$。

**優化想法（多源 BFS）**：
- **從門出發**：與其從房間去找門，不如 **從所有的門同時出發，向外擴展**。
- **層序遍歷**：利用佇列（Queue），我們先將網格中所有為 `0` 的門的座標全部加入 Queue。
- **距離更新**：
  - 門擴展到的第一層空房間，距離為 1；
  - 第二層，距離為 2。
  - **剪枝**：由於 BFS 保證我們先訪問到的節點走的是最短路徑，我們只需在遇到數值為 `INF` 的格子時進行更新，並將該格子放入 Queue 中。遇到 `-1`（牆壁）或已經訪問過有具體步數的格子，則跳過。

- **時間複雜度**: $O(M \times N)$，每個格子最多被訪問一次。
- **空間複雜度**: $O(M \times N)$，用於 BFS 的佇列儲存。

## 程式碼實作

### Python
```python
from collections import deque

class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> None:
        """
        Do not return anything, modify rooms in-place instead.
        """
        if not rooms or not rooms[0]:
            return
            
        m, n = len(rooms), len(rooms[0])
        queue = deque()
        
        # 1. 蒐集所有的門 (值為 0)
        for r in range(m):
            for c in range(n):
                if rooms[r][c] == 0:
                    queue.append((r, c))
                    
        # 2. 多源 BFS 向外擴展
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        
        while queue:
            r, c = queue.popleft()
            
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                # 越界或是已經訪問過的格子、牆壁，直接略過
                if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == 2147483647:
                    rooms[nr][nc] = rooms[r][c] + 1
                    queue.append((nr, nc))
```

### C++
```cpp
#include <vector>
#include <queue>

class Solution {
public:
    void wallsAndGates(std::vector<std::vector<int>>& rooms) {
        if (rooms.empty() || rooms[0].empty()) return;

        int m = rooms.size();
        int n = rooms[0].size();
        std::queue<std::pair<int, int>> q;

        // 1. 收集所有的門
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (rooms[r][c] == 0) {
                    q.push({r, c});
                }
            }
        }

        // 2. 多源 BFS
        int directions[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();

            for (int i = 0; i < 4; ++i) {
                int nr = r + directions[i][0];
                int nc = c + directions[i][1];

                if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] == 2147483647) {
                    rooms[nr][nc] = rooms[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
    }
};
```
