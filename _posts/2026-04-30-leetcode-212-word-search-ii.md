---
title: "LeetCode #212: Word Search II (單詞搜索 II)"
categories:
  - Array
  - String
  - Backtracking
  - Trie
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個 `m x n` 個字符的網格 `board` 和一個字符串列表 `words`，找出所有同時在網格和字典中出現的單詞。
單詞必須按照字母順序，通過 **相鄰** 的單元格內的字母構成，其中「相鄰」單元格是那些水平相鄰或垂直相鄰的單元格。同一個單元格內的字母在一個單詞中不允許被重複使用。

## 解題心得：Trie + DFS 回溯
這題是 Word Search I 的升級版。如果對每個單詞單獨進行 DFS，效率會極低。

**核心邏輯：**
1. **建立 Trie**：將所有待查找的單詞 `words` 存入前綴樹中。
2. **網格遍歷**：遍歷網格的每個位置，從該點開始進行 DFS。
3. **DFS 剪枝**：
   - 只有當當前網格字母在 Trie 的當前層級中存在時，才繼續向下搜索。
   - 記錄已訪問的單元格（或將當前單元格臨時修改為特殊字符 `#`）。
   - 當在 Trie 中到達一個單詞的末尾時，將單詞加入結果集。
4. **優化**：為了避免重複加入，可以在 Trie 中找到單詞後將其 `isWord` 標記設為 `false`，或者直接從 Trie 中刪除該路徑。

- **時間複雜度**: $O(M \times N \times 3^L)$，其中 $M, N$ 是網格尺寸，$L$ 是單詞最大長度。
- **空間複雜度**: $O(W \times L)$，其中 $W$ 是單詞數量。

## 程式碼實作

### Python
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # 建立 Trie
        root = TrieNode()
        for w in words:
            node = root
            for char in w:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = w
            
        m, n = len(board), len(board[0])
        res = []
        
        def dfs(r, c, node):
            char = board[r][c]
            if char not in node.children:
                return
            
            curr_node = node.children[char]
            if curr_node.word:
                res.append(curr_node.word)
                curr_node.word = None # 避免重複
                
            board[r][c] = "#" # 標記訪問
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] != "#":
                    dfs(nr, nc, curr_node)
            board[r][c] = char # 恢復回溯
            
            # 優化：剪枝，如果子節點為空，則刪除當前分支
            if not curr_node.children:
                node.children.pop(char)

        for i in range(m):
            for j in range(n):
                dfs(i, j, root)
                
        return res
```

### C++
```cpp
#include <vector>
#include <string>

struct TrieNode {
    std::string word = "";
    TrieNode* children[26] = {nullptr};
};

class Solution {
    void insert(TrieNode* root, std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) node->children[c - 'a'] = new TrieNode();
            node = node->children[c - 'a'];
        }
        node->word = word;
    }

    void dfs(std::vector<std::vector<char>>& board, int r, int c, TrieNode* node, std::vector<std::string>& res) {
        char ch = board[r][c];
        if (ch == '#' || !node->children[ch - 'a']) return;

        node = node->children[ch - 'a'];
        if (node->word != "") {
            res.push_back(node->word);
            node->word = ""; // 避免重複
        }

        board[r][c] = '#';
        int dr[] = {0, 0, 1, -1};
        int dc[] = {1, -1, 0, 0};
        for (int i = 0; i < 4; i++) {
            int nr = r + dr[i], nc = c + dc[i];
            if (nr >= 0 && nr < board.size() && nc >= 0 && nc < board[0].size()) {
                dfs(board, nr, nc, node, res);
            }
        }
        board[r][c] = ch;
    }

public:
    std::vector<std::string> findWords(std::vector<std::vector<char>>& board, std::vector<std::string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) insert(root, w);

        std::vector<std::string> res;
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                dfs(board, i, j, root, res);
            }
        }
        return res;
    }
};
```
