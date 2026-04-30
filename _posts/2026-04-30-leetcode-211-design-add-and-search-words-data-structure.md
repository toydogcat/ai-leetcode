---
title: "LeetCode #211: Design Add and Search Words Data Structure (設計添加與搜索單詞數據結構)"
categories:
  - Design
  - Trie
  - Backtracking
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
請你設計一個數據結構，支持添加新單詞和查找字符串是否與任何先前添加的字符串匹配。

實現 `WordDictionary` 類：
- `WordDictionary()`：初始化對象。
- `void addWord(word)`：將 `word` 添加到數據結構中。
- `bool search(word)`：如果數據結構中存在與 `word` 匹配的字符串，則返回 `true` ；否則，返回 `false` 。`word` 中可能包含一些 `'.'` ，每個 `'.'` 都可以表示任何一個字母。

## 解題心得：Trie + DFS 模糊查詢
這題是 [LeetCode #208 (Trie)](./2026-04-30-leetcode-208-implement-trie-prefix-tree.md) 的進階版，引入了通配符 `.`。

**核心邏輯：**
1. **基礎結構**：依然使用 Trie (前綴樹)。
2. **模糊查詢**：
   - 如果當前字符是普通字母，則正常向下查找。
   - 如果當前字符是 `'.'`，則需要遍歷當前節點的所有子節點（26 個字母），對每個子節點遞迴調用搜索函數。只要有一個分支返回 `true`，結果就是 `true`。

- **時間複雜度**:
  - `addWord`: $O(L)$。
  - `search`: 最壞情況下（全是 `.`）會遍歷整個 Trie。
- **空間複雜度**: $O(T \times 26)$。

## 程式碼實作

### Python
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def search(self, word: str) -> bool:
        def dfs(index, node):
            if index == len(word):
                return node.is_word
            
            char = word[index]
            if char == '.':
                for child in node.children.values():
                    if dfs(index + 1, child):
                        return True
                return False
            else:
                if char not in node.children:
                    return False
                return dfs(index + 1, node.children[char])
        
        return dfs(0, self.root)
```

### C++
```cpp
#include <string>
#include <vector>

class WordDictionary {
private:
    struct TrieNode {
        TrieNode* children[26];
        bool isWord;
        TrieNode() : isWord(false) {
            for (int i = 0; i < 26; i++) children[i] = nullptr;
        }
    };
    TrieNode* root;

    bool dfs(const std::string& word, int index, TrieNode* node) {
        if (index == word.length()) return node->isWord;
        
        char c = word[index];
        if (c == '.') {
            for (int i = 0; i < 26; i++) {
                if (node->children[i] && dfs(word, index + 1, node->children[i])) {
                    return true;
                }
            }
            return false;
        } else {
            int i = c - 'a';
            if (node->children[i] == nullptr) return false;
            return dfs(word, index + 1, node->children[i]);
        }
    }

public:
    WordDictionary() {
        root = new TrieNode();
    }
    
    void addWord(std::string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children[c - 'a'] == nullptr) {
                node->children[c - 'a'] = new TrieNode();
            }
            node = node->children[c - 'a'];
        }
        node->isWord = true;
    }
    
    bool search(std::string word) {
        return dfs(word, 0, root);
    }
};
```
