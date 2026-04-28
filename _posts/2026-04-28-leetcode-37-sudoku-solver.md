---
title: "LeetCode #37: Sudoku Solver"
categories:
  - Backtracking
  - Matrix
tags:
  - Hard
  - Python
  - C++
---

## 解題思路：回溯法
遍歷所有格子，遇到空位嘗試填入 1-9。如果填入後能解開數獨則成功，否則回溯。

### Python
```python
class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        def isValid(r, c, char):
            for i in range(9):
                if board[i][c] == char: return False
                if board[r][i] == char: return False
                if board[3*(r//3)+i//3][3*(c//3)+i%3] == char: return False
            return True

        def solve():
            for r in range(9):
                for c in range(9):
                    if board[r][c] == '.':
                        for char in "123456789":
                            if isValid(r, c, char):
                                board[r][c] = char
                                if solve(): return True
                                board[r][c] = '.'
                        return False
            return True
        solve()
```

### C++
```cpp
class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
    bool solve(vector<vector<char>>& board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char ch = '1'; ch <= '9'; ch++) {
                        if (isValid(board, r, c, ch)) {
                            board[r][c] = ch;
                            if (solve(board)) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    bool isValid(vector<vector<char>>& board, int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[i][c] == ch) return false;
            if (board[r][i] == ch) return false;
            if (board[3*(r/3)+i/3][3*(c/3)+i%3] == ch) return false;
        }
        return true;
    }
};
```
