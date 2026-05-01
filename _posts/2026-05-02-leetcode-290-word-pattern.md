---
title: "LeetCode #290: Word Pattern (單詞規律)"
categories:
  - Hash Table
  - String
tags:
  - Easy
  - Python
  - C++
---

## 題目描述
給定一個規律 `pattern` 和一個字串 `s`，判斷 `s` 是否遵循相同的規律。

這裡的 **遵循** 指的是完全匹配。具體而言，每個在 `pattern` 中的字母與字串 `s` 中的每個非空單詞之間，存在著 **雙向的一對一映射關係**。

**範例 1:**
```
輸入: pattern = "abba", s = "dog cat cat dog"
輸出: true
```

**範例 2:**
```
輸入: pattern = "abba", s = "dog cat cat fish"
輸出: false
```

**範例 3:**
```
輸入: pattern = "aaaa", s = "dog cat cat dog"
輸出: false
```

## 解題心得：雙向雜湊映射
本題的映射規則要求字母與單詞之間是一對一對應的。
這與 [Isomorphic Strings](./2026-04-30-leetcode-205-isomorphic-strings.md) 的核心邏輯完全一致。

**核心邏輯**：
1. **單詞提取與長度比對**：
   - 首先將字串 `s` 依照空格進行拆分（Split），獲取單詞列表 `words`。
   - 如果 `len(pattern) != len(words)`，顯然無法一對一匹配，直接返回 `false`。
2. **建立雙向映射**：
   - 建立兩個雜湊表（Hash Maps）：
     - `p2w`：儲存 `pattern` 中的字母到 `words` 中單詞的映射。
     - `w2p`：儲存 `words` 中單詞到 `pattern` 中字母的映射。
3. **遍歷與驗證**：
   - 遍歷 `pattern` 的字母和對應的單詞：
     - 如果在映射中發現矛盾（例如同一個字母映射到了多個單詞，或是多個字母映射到同一個單詞），返回 `false`。
4. 若遍歷完成後均無矛盾，則返回 `true`。

- **時間複雜度**: $O(N)$，其中 $N$ 是字串 `s` 的總長度。
- **空間複雜度**: $O(K)$，其中 $K$ 為不同單詞和字母的數量。

## 程式碼實作

### Python
```python
class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        
        if len(pattern) != len(words):
            return False
            
        p2w = {}
        w2p = {}
        
        for char, word in zip(pattern, words):
            # 檢查字母到單詞的映射
            if char in p2w and p2w[char] != word:
                return False
            # 檢查單詞到字母的映射
            if word in w2p and w2p[word] != char:
                return False
                
            p2w[char] = word
            w2p[word] = char
            
        return True
```

### C++
```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <sstream>

class Solution {
public:
    bool wordPattern(std::string pattern, std::string s) {
        std::vector<std::string> words;
        std::stringstream ss(s);
        std::string word;
        while (ss >> word) {
            words.push_back(word);
        }

        if (pattern.length() != words.size()) {
            return false;
        }

        std::unordered_map<char, std::string> p2w;
        std::unordered_map<std::string, char> w2p;

        for (size_t i = 0; i < pattern.length(); ++i) {
            char c = pattern[i];
            std::string w = words[i];

            if (p2w.count(c) && p2w[c] != w) return false;
            if (w2p.count(w) && w2p[w] != c) return false;

            p2w[c] = w;
            w2p[w] = c;
        }

        return true;
    }
};
```
