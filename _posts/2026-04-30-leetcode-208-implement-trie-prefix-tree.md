---
title: "LeetCode #208: Implement Trie (Prefix Tree) (實現 Trie (前綴樹))"
categories:
  - Design
  - Trie
  - Hash Table
  - String
tags:
  - Medium
  - Python
  - C++
---

## 題目描述
**Trie**（發音類似 "try"）或者說 **前綴樹** ，是一種樹形數據結構，用於高效地存儲和檢索字符串數據集中的鍵。這一數據結構有多種應用場景，例如自動補全和拼寫檢查。

請你實現 `Trie` 類：
- `Trie()`：初始化前綴樹對象。
- `void insert(String word)`：向前綴樹中插入字符串 `word` 。
- `boolean search(String word)`：如果字符串 `word` 在前綴樹中，返回 `true`（即，在檢索之前已經插入）；否則，返回 `false` 。
- `boolean startsWith(String prefix)`：如果之前插入的字符串 `word` 中有一個以前綴 `prefix` 開頭的，返回 `true` ；否則，返回 `false` 。

## 解題心得：多叉樹結構
Trie 的核心思想是空間換時間，利用字符串的公共前綴來減少查詢時間。

**核心邏輯：**
1. **節點結構**：每個節點包含一個指向子節點的數組或字典（通常大小為 26，對應 'a'-'z'），以及一個布林標誌 `isEnd`，表示是否有單詞以該節點結尾。
2. **插入 (Insert)**：遍歷單詞，逐個字符在樹中向下走。如果子節點不存在則創建。最後標記 `isEnd = True`。
3. **查詢 (Search)**：與插入類似，但如果中間遇到子節點不存在則返回 `False`。最後檢查 `isEnd`。
4. **前綴查詢 (StartsWith)**：與查詢類似，但最後不需要檢查 `isEnd`，只要路徑存在即可。

- **時間複雜度**: $O(L)$，其中 $L$ 是單詞的長度。
- **空間複雜度**: $O(T \times 26)$，其中 $T$ 是所有插入字符的總數。

## 程式碼實作

### Python
```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

### C++
```cpp
#include <string>
#include <vector>

class Trie {
private:
    struct TrieNode {
        TrieNode* children[26];
        bool isEnd;
        TrieNode() : isEnd(false) {
            for (int i = 0; i < 26; i++) children[i] = nullptr;
        }
    };
    
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(std::string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children[c - 'a'] == nullptr) {
                node->children[c - 'a'] = new TrieNode();
            }
            node = node->children[c - 'a'];
        }
        node->isEnd = true;
    }
    
    bool search(std::string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children[c - 'a'] == nullptr) return false;
            node = node->children[c - 'a'];
        }
        return node->isEnd;
    }
    
    bool startsWith(std::string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (node->children[c - 'a'] == nullptr) return false;
            node = node->children[c - 'a'];
        }
        return true;
    }
};
```
