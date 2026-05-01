---
title: "LeetCode #289: Game of Life (生命遊戲)"
categories:
  - Array
  - Matrix
  - Simulation
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
根據 **康威生命遊戲（Conway's Game of Life）**，給定一個 `m x n` 的二維網格面板 `board`，其中每個格子包含一個代表活細胞（`1`）或死細胞（`0`）的狀態。

請你根據以下規則，更新面板至下一個狀態（這四個規則是同時發生的）：
1. **人口不足**：如果活細胞周圍 8 個鄰居中，活細胞數量小於 2 個，則該位置活細胞死亡。
2. **正常繁衍**：如果活細胞周圍 8 個鄰居中，有 2 個或 3 個活細胞，則該位置活細胞繼續存活。
3. **人口過剩**：如果活細胞周圍 8 個鄰居中，活細胞數量超過 3 個，則該位置活細胞死亡。
4. **復活**：如果死細胞周圍 8 個鄰居中，恰好有 3 個活細胞，則該位置死細胞復活成為活細胞。

**進階要求**：在原面板上 **原地（In-place）** 修改，不使用額外的數組空間。

**範例 1:**
```
輸入: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
輸出: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

## 解題心得：利用狀態編碼進行原地修改
題目要求在原網格上原地修改。因為所有格子的狀態更新必須是同時發生的，在處理格子 `A` 時，如果直接改變了其數值，會影響到接下來處理其鄰居格子時的活細胞計數。

**原地修改的核心邏輯**：
我們可以使用額外的二進制狀態、或自定義數值來編碼 **舊狀態與新狀態**：
- **`2`**：原本是死細胞 `0`，更新後變成活細胞 `1`（`0 -> 1`）。
- **`-1`**：原本是活細胞 `1`，更新後變成死細胞 `0`（`1 -> 0`）。

1. **第一步（統計與標記）**：
   - 遍歷每個格子，統計其 8 個鄰居中原有狀態是活細胞的個數（當數值為 `1` 或 `-1` 時算作活細胞）。
   - 根據活細胞個數，若狀態發生改變，將其更新為 `-1` 或 `2`。
2. **第二步（還原狀態）**：
   - 再次遍歷網格，將所有 `-1` 還原為 `0`，將所有 `2` 還原為 `1`。

- **時間複雜度**: $O(M \times N)$。
- **空間複雜度**: $O(1)$，沒有使用額外網格空間。

## 程式碼實作

### Python
```python
class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        if not board or not board[0]:
            return
            
        m, n = len(board), len(board[0])
        
        # 八個方向的鄰居
        directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
        
        # 1. 第一步：統計並使用編碼標記狀態改變
        for r in range(m):
            for c in range(n):
                live_neighbors = 0
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    # 若數值是 1 或 -1，代表它原本是活細胞
                    if 0 <= nr < m and 0 <= nc < n and abs(board[nr][nc]) == 1:
                        live_neighbors += 1
                        
                # 規則 1、3：活細胞死亡 1 -> 0
                if board[r][c] == 1 and (live_neighbors < 2 or live_neighbors > 3):
                    board[r][c] = -1
                    
                # 規則 4：死細胞復活 0 -> 1
                if board[r][c] == 0 and live_neighbors == 3:
                    board[r][c] = 2
                    
        # 2. 第二步：將編碼還原成正確的新狀態
        for r in range(m):
            for c in range(n):
                if board[r][c] == -1:
                    board[r][c] = 0
                elif board[r][c] == 2:
                    board[r][c] = 1
```

### C++
```cpp
#include <vector>
#include <cmath>

class Solution {
public:
    void gameOfLife(std::vector<std::vector<int>>& board) {
        if (board.empty() || board[0].empty()) return;

        int m = board.size();
        int n = board[0].size();
        int directions[8][2] = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}};

        // 1. 遍歷並標記狀態改變
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                int liveNeighbors = 0;
                for (int i = 0; i < 8; ++i) {
                    int nr = r + directions[i][0];
                    int nc = c + directions[i][1];

                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && std::abs(board[nr][nc]) == 1) {
                        liveNeighbors++;
                    }
                }

                if (board[r][c] == 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
                    board[r][c] = -1; // 1 -> 0
                }
                if (board[r][c] == 0 && liveNeighbors == 3) {
                    board[r][c] = 2; // 0 -> 1
                }
            }
        }

        // 2. 還原真實狀態
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (board[r][c] == -1) {
                    board[r][c] = 0;
                } else if (board[r][c] == 2) {
                    board[r][c] = 1;
                }
            }
        }
    }
};
```
