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

## 題目描述
給定一個 `m x n` 二維字符網格 `board` 和一個字符串單詞 `word` 。如果 `word` 存在於網格中，返回 `true` ；否則，返回 `false` 。單詞必須按照字母順序，通過相鄰的單元格內的字母構成，其中「相鄰」單元格是那些水平相鄰或垂直相鄰的單元格。同一個單元格內的字母不允許重複使用。

## 解題心得：地毯式搜索 (DFS)
這題就像是在字盤裡玩「連字遊戲」。

**核心邏輯：**
1. **起點探索**：我們遍歷整個網格，只要看到網格裡的字母跟單詞的第一個字母一樣，就從那裡開始「探險」。
2. **四面出擊**：從起點開始，往上下左右四個方向看，看下一個位置是不是我們要找的字母。
3. **標記路徑**：為了不走回頭路，我們每踩到一個格子，就先給它蓋個「暫時不可用」的戳記，等這條路探索完了，再把戳記拿掉（這就是回溯）。
4. **勝利條件**：只要我們能順利走完單詞的所有字母，就代表找到了！

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
