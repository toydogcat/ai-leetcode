---
title: "LeetCode #30: Substring with Concatenation of All Words"
categories:
  - String
  - Sliding Window
  - Hash Table
tags:
  - Hard
  - Python
  - C++
---

## 題目描述
給定一個字符串 `s` 和一些 **長度相同** 的單詞 `words` 。找出 `s` 中所有恰好由 `words` 中所有單詞串聯形成的子串的起始索引。

## 解題心得：滑動窗口與單詞計數
這是一道 Hard 題，雖然看起來很複雜，但只要掌握兩個關鍵點就能破解：
1. **單詞長度相同**：這是大前提，這意味著我們可以把字符串 `s` 切成一塊一塊等長的積木。
2. **滑動窗口**：我們不需要一個一個字符移動，而是以「單詞長度」為步長進行滑動。

**核心邏輯：**
- 我們用一個哈希表 `count` 記錄 `words` 裡每個單詞出現的次數。
- 窗口滑動時，我們也維護一個 `window_count`。
- 如果窗口裡的單詞跟 `count` 完全一致，那就是我们要找的索引。

這就像是在一串珍珠項鍊裡找特定組合的吊墜。因為每個吊墜（單詞）長度都一樣，我們只需要按照這個長度去一段一段檢查就行了。

- **時間複雜度**: $O(n \cdot k)$，其中 $k$ 是單詞長度。

### Python
```python
from collections import Counter
class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if not s or not words: return []
        word_len = len(words[0])
        all_len = len(words) * word_len
        count = Counter(words)
        res = []
        for i in range(len(s) - all_len + 1):
            tmp_s = s[i:i+all_len]
            tmp_words = [tmp_s[j:j+word_len] for j in range(0, all_len, word_len)]
            if Counter(tmp_words) == count:
                res.append(i)
        return res
```

### C++
```cpp
#include <vector>
#include <string>
#include <unordered_map>

class Solution {
public:
    std::vector<int> findSubstring(std::string s, std::vector<std::string>& words) {
        if (s.empty() || words.empty()) return {};
        int wordLen = words[0].length();
        int wordCount = words.size();
        int totalLen = wordLen * wordCount;
        std::unordered_map<std::string, int> count;
        for (const std::string& w : words) count[w]++;
        
        std::vector<int> res;
        for (int i = 0; i <= (int)s.length() - totalLen; i++) {
            std::unordered_map<std::string, int> seen;
            int j = 0;
            for (; j < wordCount; j++) {
                std::string word = s.substr(i + j * wordLen, wordLen);
                if (count.find(word) != count.end()) {
                    seen[word]++;
                    if (seen[word] > count[word]) break;
                } else break;
            }
            if (j == wordCount) res.push_back(i);
        }
        return res;
    }
};
```
