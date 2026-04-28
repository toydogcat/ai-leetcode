---
title: "LeetCode #51: N-Queens"
categories:
  - Backtracking
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
按照國際象棋的規則，皇后可以攻擊與之處在同一行或同一列或同一斜線上的棋子。`n` 皇后問題研究的是如何將 `n` 個皇后放置在 `n×n` 的棋盤上，並且使皇后彼此之間不能相互攻擊。

## 解題心得：優雅的排兵布陣
這是「回溯算法」最著名的經典題目。

**核心邏輯：**
1. **逐行放置**：我們一行一行往下放皇后，這樣就保證了「不同行」。
2. **三重檢查**：在每一行放皇后時，我們要檢查這個位置的：
   - **垂直方向** 是否已有皇后。
   - **左上 45 度斜線** 是否已有皇后。
   - **右上 45 度斜線** 是否已有皇后。
3. **撤回與嘗試**：如果某一行發現沒地方放了，說明上一行的位置不對，我們要「撤回」上一行的皇后，換個位置再試。

這就像是在排位置，如果你發現這條路走不通，就退回上一步換條路走。

### Python
```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = [['.'] * n for _ in range(n)]
        cols = set()
        diag1 = set() # r - c
        diag2 = set() # r + c
        
        def backtrack(r):
            if r == n:
                res.append(["".join(row) for row in board])
                return
            for c in range(n):
                if c in cols or (r - c) in diag1 or (r + c) in diag2:
                    continue
                cols.add(c); diag1.add(r - c); diag2.add(r + c)
                board[r][c] = 'Q'
                backtrack(r + 1)
                board[r][c] = '.'
                cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
        
        backtrack(0)
        return res
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_set>

class Solution {
public:
    std::vector<std::vector<std::string>> solveNQueens(int n) {
        std::vector<std::vector<std::string>> res;
        std::vector<std::string> board(n, std::string(n, '.'));
        std::unordered_set<int> cols, diag1, diag2;
        backtrack(res, board, 0, n, cols, diag1, diag2);
        return res;
    }
    void backtrack(std::vector<std::vector<std::string>>& res, std::vector<std::string>& board, 
                   int r, int n, std::unordered_set<int>& cols, 
                   std::unordered_set<int>& diag1, std::unordered_set<int>& diag2) {
        if (r == n) {
            res.push_back(board);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (cols.count(c) || diag1.count(r - c) || diag2.count(r + c)) continue;
            board[r][c] = 'Q';
            cols.insert(c); diag1.insert(r - c); diag2.insert(r + c);
            backtrack(res, board, r + 1, n, cols, diag1, diag2);
            board[r][c] = '.';
            cols.erase(c); diag1.erase(r - c); diag2.erase(r + c);
        }
    }
};
```
