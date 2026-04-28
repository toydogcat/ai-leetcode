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

## 題目描述
編寫一個程序，通過填充空格來解決數獨問題。數獨的解法需 **遵循以下規則**：
1. 數字 `1-9` 在每一行只能出現一次。
2. 數字 `1-9` 在每一列只能出現一次。
3. 數字 `1-9` 在每一個以粗實線分隔的 `3x3` 宮內只能出現一次。

## 解題心得：地毯式搜索
這題是 Hard，因為它需要處理大量的可能性。

**核心邏輯：回溯算法**
1. **找空位**：我們遍歷棋盤，找到還沒填數字的地方（`.`）。
2. **嘗試填入**：在這個位置試著填入 `1` 到 `9`。
3. **驗證可行性**：填入後，立刻檢查這數字在「行」、「列」、「九宮格」裡有沒有重複。
4. **遞迴與撤回**：
   - 如果這個數字放得下，我們就去填下一個空格。
   - 如果後面的空格填不下去了，說明剛剛這個數字選錯了，我們把它拿掉（撤回），換一個數字再試。
5. **結束條件**：當所有格子都填滿時，我們就成功了！

這就像是在走迷宮，如果你在某個路口發現沒路了，你就退回上一個路口，換條路走走看。

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
