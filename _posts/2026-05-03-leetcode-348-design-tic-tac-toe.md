---
title: "LeetCode #348: Design Tic-Tac-Toe (設計井字棋)"
categories:
  - Design
  - Array
  - Hash Table
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
請你設計一個井字棋遊戲，在一塊大小為 `n x n` 的棋盤上進行。當任何一列、一行或兩條對角線被填滿相同玩家的棋子時，該玩家獲勝。

## 解題心得
如果每次落子都掃描整張棋盤，落子操作的時間複雜度為 $O(N)$（或 $O(N^2)$）。我們可以進行 **$O(1)$ 常數時間優化**：
- 由於只有兩個玩家，我們可以將玩家 1 落子記為 `+1`，玩家 2 落子記為 `-1`。
- 維護四種類型的狀態累加和：
  1. `rows` 陣列：`rows[i]` 記錄第 `i` 行的所有落子和。
  2. `cols` 陣列：`cols[j]` 記錄第 `j` 列的所有落子和。
  3. `diag` 變數：記錄主對角線（`row == col`）落子和。
  4. `anti_diag` 變數：記錄反對角線（`row + col == n - 1`）落子和。
- 每次落子時，對應的狀態累加 `1`（玩家 1）或 `-1`（玩家 2）。如果累加後其絕對值等於 `n`，代表該行/列/對角線被全部填滿，該玩家獲勝！

- **時間複雜度**: 落子 `move` $O(1)$
- **空間複雜度**: O(N)

## 程式碼實作

### Python
```python
class TicTacToe:
    def __init__(self, n: int):
        self.n = n
        self.rows = [0] * n
        self.cols = [0] * n
        self.diag = 0
        self.anti_diag = 0

    def move(self, row: int, col: int, player: int) -> int:
        score = 1 if player == 1 else -1
        
        self.rows[row] += score
        self.cols[col] += score
        if row == col:
            self.diag += score
        if row + col == self.n - 1:
            self.anti_diag += score
            
        if (abs(self.rows[row]) == self.n or 
            abs(self.cols[col]) == self.n or 
            abs(self.diag) == self.n or 
            abs(self.anti_diag) == self.n):
            return player
            
        return 0
```

### C++
```cpp
#include <vector>
#include <cmath>

class TicTacToe {
private:
    std::vector<int> rows;
    std::vector<int> cols;
    int diag;
    int antiDiag;
    int n;

public:
    TicTacToe(int n) : rows(n, 0), cols(n, 0), diag(0), antiDiag(0), n(n) {}
    
    int move(int row, int col, int player) {
        int score = (player == 1) ? 1 : -1;

        rows[row] += score;
        cols[col] += score;
        if (row == col) diag += score;
        if (row + col == n - 1) antiDiag += score;

        if (std::abs(rows[row]) == n || 
            std::abs(cols[col]) == n || 
            std::abs(diag) == n || 
            std::abs(antiDiag) == n) {
            return player;
        }
        return 0;
    }
};
```
