---
title: "LeetCode #79: Word Search"
categories:
  - Backtracking
  - Matrix
tags:
  - Medium
  - Python
  - C++
---

## 解題思路
在矩陣中進行深度優先搜索 (DFS)，注意標記已訪問路徑。

### Python
```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        m, n = len(board), len(board[0])
        def dfs(r, c, k):
            if k == len(word): return True
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != word[k]:
                return False
            tmp, board[r][c] = board[r][c], '/'
            res = dfs(r+1, c, k+1) or dfs(r-1, c, k+1) or dfs(r, c+1, k+1) or dfs(r, c-1, k+1)
            board[r][c] = tmp
            return res
        
        for i in range(m):
            for j in range(n):
                if dfs(i, j, 0): return True
        return False
```

### C++
```cpp
#include <vector>
#include <string>

class Solution {
public:
    bool exist(std::vector<std::vector<char>>& board, std::string word) {
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
    bool dfs(std::vector<std::vector<char>>& board, std::string& word, int r, int c, int k) {
        if (k == word.length()) return true;
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size() || board[r][c] != word[k]) return false;
        char tmp = board[r][c];
        board[r][c] = '/';
        bool res = dfs(board, word, r + 1, c, k + 1) || dfs(board, word, r - 1, c, k + 1) ||
                   dfs(board, word, r, c + 1, k + 1) || dfs(board, word, r, c - 1, k + 1);
        board[r][c] = tmp;
        return res;
    }
};
```
