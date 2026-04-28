---
title: "LeetCode #130: Surrounded Regions"
categories:
  - Array
  - Matrix
  - DFS
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
給你一個 `m x n` 的矩陣 `board` ，包含若干字符 `'X'` 和 `'O'` ，找到所有被 `'X'` 圍繞的區域，並將這些區域裡所有的 `'O'` 用 `'X'` 填充。

## 解題心得：圍魏救趙
這題的關鍵在於：**什麼樣的 'O' 不會被填充？**
答案是：**與邊界相連的 'O'，以及與這些 'O' 直接或間接相連的 'O'。**

**解題步驟：**
1. 遍歷矩陣的 **四條邊**。
2. 如果邊界上有 'O'，以它為起點進行 DFS/BFS，將所有連通的 'O' 暫時標記為另一個字符（比如 '#'）。
3. 遍歷整個矩陣：
   - 所有的 '#' 都是安全的，還原回 'O'。
   - 所有的 'O' 都是被包圍的，修改為 'X'。

### Python
```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board: return
        rows, cols = len(board), len(board[0])
        
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
                return
            board[r][c] = '#' # 標記為安全
            dfs(r+1, c)
            dfs(r-1, c)
            dfs(r, c+1)
            dfs(r, c-1)
            
        # 從邊界出發
        for r in range(rows):
            dfs(r, 0)
            dfs(r, cols-1)
        for c in range(cols):
            dfs(0, c)
            dfs(rows-1, c)
            
        # 遍歷還原與填充
        for r in range(rows):
            for c in range(cols):
                if board[r][c] == 'O': board[r][c] = 'X'
                if board[r][c] == '#': board[r][c] = 'O'
```

### C++
```cpp
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty()) return;
        int rows = board.size();
        int cols = board[0].size();
        
        for (int r = 0; r < rows; ++r) {
            dfs(board, r, 0);
            dfs(board, r, cols - 1);
        }
        for (int c = 0; c < cols; ++c) {
            dfs(board, 0, c);
            dfs(board, rows - 1, c);
        }
        
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                if (board[r][c] == '#') board[r][c] = 'O';
            }
        }
    }
    
    void dfs(vector<vector<char>>& board, int r, int c) {
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != 'O') return;
        board[r][c] = '#';
        dfs(board, r + 1, c);
        dfs(board, r - 1, c);
        dfs(board, r, c + 1);
        dfs(board, r, c - 1);
    }
};
```
